import React, { useContext, useEffect, useState } from "react";
import { getSiteProducts } from "../../../../../Services/Products";
import { BasketContext } from "../../../../../context/BasketContext";
import "./Shop.css";
import { Slider } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function Shop() {
  const [shop, setShop] = useState([]);
  const { addToBasket } = useContext(BasketContext);

  const [brandFilters, setBrandFilters] = useState({
    Nike: false,
    Puma: false,
    TomyHilfiger: false,
    Zara: false,
    PullBear: false,
  });

  const [inStockFilter, setInStockFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50]);

  useEffect(() => {
    getSiteProducts().then((res) => {
      setShop(res.data.product);
    });
  }, []);

  const handleSliderChange = (values) => {
    setPriceRange(values);
  };

  const filterSubmit = async (e) => {
    e.preventDefault();

    const selectedBrandIds = Object.keys(brandFilters)
      .filter((brandId) => brandFilters[brandId])
      .map((selectedId) => brandId.find((brand) => brand.id === selectedId)?.id)
      .filter(Boolean);

    const filters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      stock: inStockFilter ? "inStock" : "",
      brandId: selectedBrandIds.join(","),
    };

    try {
      const res = await getSiteProducts(filters);
      setShop(res.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  const brandId = [
    { name: "Nike", id: "e4a61430-adfb-11ee-aa66-073a661e97ae" },
    { name: "Puma", id: "f9323dc0-adfb-11ee-aa66-073a661e97ae" },
    { name: "TomyHilfiger", id: "06ba71b0-adfc-11ee-aa66-073a661e97ae" },
    { name: "Zara", id: "1a1b1390-adfc-11ee-aa66-073a661e97ae" },
    { name: "PullBear", id: "2b2171c0-adfc-11ee-aa66-073a661e97ae" },
  ];
  const location = useLocation();
  const [oldData, setOldData] = useState([]);
  const { query } = useContext(BasketContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await getSiteProducts();
        setShop(productsRes.data.product || []);
        setOldData(productsRes.data.product || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setShop(
      oldData.filter((item) => {
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          return item;
        }
      })
    );
  }, [query]);

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("query");

    if (searchQuery) {
      const filteredProducts = oldData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setShop(filteredProducts);
    } else {
      setShop(oldData);
    }
  }, [location.search, oldData]);

  const [currentIndex, setCurrentIndex] = useState(1);
  const productsPerPage = 12;
  const maxPageCount = Math.ceil(shop.length / productsPerPage);
  const paginationButtons = [];
  const maxButtonsToShow = 3;
  const startPage = Math.max(
    1,
    Math.min(
      currentIndex - Math.floor(maxButtonsToShow / 2),
      maxPageCount - maxButtonsToShow + 1
    )
  );
  const filteredProducts = shop
    .slice(
      (currentIndex - 1) * productsPerPage,
      currentIndex * productsPerPage
    );
  const endPage = Math.min(startPage + maxButtonsToShow - 1, maxPageCount);
  for (let i = startPage; i <= endPage; ++i) {
    paginationButtons.push(
      <button
        key={i}
        disabled={currentIndex === i}
        className={`paginationButton ${currentIndex === i && "activeButton"}`}
        onClick={() => {
          setCurrentIndex(i);
          window.scrollTo(0, 0);
        }}
      >
        {" "}
        {i}{" "}
      </button>
    );
  }

  return (
    <div className="shopMain">
      <div className="shopContainer">
        <form className="shopFilter" onSubmit={filterSubmit}>
          <div className="inStock">
            <label>
              <input
                type="checkbox"
                checked={inStockFilter}
                onChange={() => setInStockFilter(!inStockFilter)}
              />
              Instock
            </label>
          </div>
          <div className="checkboxFilter">
            {brandId.map((brand) => (
              <label key={brand.id}>
                <input
                  type="checkbox"
                  onChange={() =>
                    setBrandFilters((prevFilters) => ({
                      ...prevFilters,
                      [brand.id]: !prevFilters[brand.id],
                    }))
                  }
                  checked={brandFilters[brand.id]}
                />{" "}
                {brand.name}
              </label>
            ))}
          </div>
          <div className="range">
            <Slider
              range={{
                draggableTrack: true,
              }}
              defaultValue={[0, 50]}
              min={0}
              max={1000}
              onChange={handleSliderChange}
            />
          </div>
          <button type="submit">Filter</button>
        </form>
        <div className="shopPaginate">
          <div className="shopProductsBody">
            {filteredProducts.map((item) => (
              <div className="shopCard" key={item._id}>
                <div className="shopSliderProductImg">
                  <Link to={`/home/${item._id}`}>
                    <img src={item.images[2].url} alt={item.title} />
                  </Link>
                  <div className={`sale ${item.salePrice ? "" : "close"}`}>
                    SALE
                  </div>
                  <div className={`discount ${item.salePrice ? "" : "close"}`}>
                    10%
                  </div>
                  <div className={`soldOut ${item.stock === 0 ? "" : "close"}`}>
                    SOLDOUT
                  </div>
                </div>
                <div className="shopSliderProductText">
                  <p>{item.title}</p>
                  <div className="shopCardFlex">
                    <div className="shopPrice">
                      <p>{item.productPrice}.00 $</p>
                      <p
                        className={`discountPrice ${
                          item.salePrice ? "" : "close"
                        }`}
                      >
                        {item.productPrice - 10}.00$
                      </p>
                    </div>
                    {item.stock !== 0 ? (
                      <button onClick={() => addToBasket(item)}>
                        Add to card
                      </button>
                    ) : (
                      <button>Sold Out</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="shopPagination">
            <button
              disabled={currentIndex <= 1}
              onClick={() => {
                setCurrentIndex(currentIndex - 1);
                window.scrollTo(0, 0);
              }}
              style={currentIndex <= 1 ? { cursor: "no-drop" } : {}}
              className={currentIndex <= 1 ? "disabled" : ""}
            >
              <i className="bx bx-chevrons-left"></i>
            </button>
            {paginationButtons}
            <button
              disabled={currentIndex === maxPageCount}
              onClick={() => {
                setCurrentIndex(currentIndex + 1);
                window.scrollTo(0, 0);
              }}
              style={currentIndex === maxPageCount ? { cursor: "no-drop" } : {}}
              className={currentIndex === maxPageCount ? "disabled" : ""}
            >
              <i className="bx bx-chevrons-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
