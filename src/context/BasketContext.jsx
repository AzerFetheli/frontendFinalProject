import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { userContext } from "./AuthContext";
import { API } from "../axios";

export const BasketContext = createContext({
  basket: null,
  setBasket: null,
  removeFromBasket: null,
  addToBasket: null,
  backBasket: null,
  data: null,
  setData: null,
  setBackBasket: null,
  getSingleBackProduct: null,
  getSingleLocalProduct: null,
  query: null,
  setQuery: null,
  basketInProgress: null,
  isFetching: null,
  loading: null,
});

export const BasketProvider = ({ children }) => {
  const [first, setfirst] = useState(false);
  const [query, setQuery] = useState("");
  const { user } = useContext(userContext);
  const [shouldUpdate, setShouldUpdate] = useState(Date.now());
  const [basketInProgress, setBasketInProgress] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const loading = useMemo(() => {
    return isFetching || basketInProgress;
  }, [isFetching, basketInProgress]);
  const update = useCallback(() => {
    setShouldUpdate(Date.now());
  }, []);

  const [basket, setBasket] = useState([]);
  const [backBasket, setBackBasket] = useState([]);
  const [data, setData] = useState([]);

  const [userBasket, setUserBasket] = useState([]);

  useEffect(() => {
    const formattedBasket = userBasket.map(({ productId, productCount }) => ({
      productId,
      productCount,
    }));
    API.post("/site/basket", { basket: formattedBasket })
      .then((res) => {
        console.log("sucsess", res);
        update();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userBasket]);

  useEffect(() => {
    API.get("site/basket").then((res) => {
      setBackBasket(res.data.data);
    });
  }, [shouldUpdate]);

  const getSingleBackProduct = async () => {
    if (backBasket.length > 0) {
      let newArr = backBasket.map((item) => {
        return API.get(`/site/products/${item.productId}`);
      });
      let resolvedData = await Promise.all(newArr);
      console.log(resolvedData);
      resolvedData = resolvedData.map((item) => {
        return item.data.data;
      });
      setData(resolvedData);
    } else setData([]);
  };

  useEffect(() => {
    getSingleBackProduct();
  }, [backBasket]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("basket"));
    if (data) {
      setBasket(data);
    }
  }, []);

  useEffect(() => {
    let addLocalBasket = basket.map(({ _id, productCount }) => ({
      _id,
      productCount,
    }));
    localStorage.setItem("basket", JSON.stringify(addLocalBasket));
  }, [basket]);
  const getSingleLocalProduct = async () => {
    try {
      const productDetails = [];
      for (const item of basket) {
        const response = await API.get(`/site/products/${item._id}`);
        productDetails.push(response.data.data);
      }

      setData(productDetails);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleLocalProduct();
  }, [basket]);

  //Add to Basket

  const addToBasket = async (product) => {
    if (user) {
      const productId = product._id;
      const userBasketItem = userBasket.find(
        (item) => item.productId === productId
      );

      if (userBasketItem) {
        setUserBasket((prevBasket) =>
          prevBasket.map((item) =>
            item.productId === productId
              ? { productCount: item.productCount + 1 }
              : item
          )
        );
      } else {
        setUserBasket(() => [{ productId, productCount: 1 }]);
      }
    } else if (!user) {
      let basketItem = basket.find((item) => item._id === product._id);
      if (basketItem) {
        let updatedBasket = basket.map((item) =>
          item._id === product._id
            ? { ...item, productCount: item.productCount + 1 }
            : item
        );
        setBasket(updatedBasket);
      } else {
        let newBasketItem = { ...product, productCount: 1 };
        let newBasket = [...basket, newBasketItem];
        setBasket(newBasket);
      }
    }
  };

  useEffect(() => {
    
  }, [user]);
  const removeFromBasket = async (_id) => {
    if (user) {
      const res = await API.delete(`site/basket/${_id}`);
      if (res.status === 200) {
        update();
      }
    } else {
      const updatedBasket = basket.filter((item) => item._id !== _id);
      setBasket(updatedBasket);
    }
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        setBasket,
        removeFromBasket,
        addToBasket,
        backBasket,
        data,
        setData,
        setBackBasket,
        getSingleBackProduct,
        getSingleLocalProduct,
        query,
        setQuery,
        basketInProgress,
        isFetching,
        loading,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
