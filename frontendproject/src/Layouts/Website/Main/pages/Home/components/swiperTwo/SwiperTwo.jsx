import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./SwiperTwo.css";
import { Grid, Pagination } from "swiper/modules";
import { getSiteProducts } from "../../../../../../../Services/Products";
import Card from "../SectionThree/components/Card";

export default function SwiperTwo() {
  const [sliderProduct, setSliderProduct] = useState([]);
  useEffect(() => {
    getSiteProducts().then((res) => {
      setSliderProduct(res.data.product);
    });
  }, []);

  console.log(sliderProduct);
  return (
    <>
      <div className="swiperTwoSlider">
        <div className="swiperTwoContainer">
          <Swiper
            slidesPerView={3}
            grid={{
              rows: 2,
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
