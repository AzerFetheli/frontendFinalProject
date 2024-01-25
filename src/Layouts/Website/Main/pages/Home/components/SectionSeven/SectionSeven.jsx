import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './SectionSeven.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

export default function SectionSeven() {
    return (
        <>
            <section className="sectionSeven">
                <div className="sectionSevenContainer">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        freeMode={true}
                        loop={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                            },
                            640: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 40,
                            },
                            1024: {
                              slidesPerView: 5,
                              spaceBetween: 50,
                            },
                          }}

                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    > 
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/1_0d5f3575-0151-45aa-9aef-72353b0e63e2.png?v=1613793664" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/2.png?v=1613793664" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/3.png?v=1613793664" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/4.png?v=1613793664" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/5.png?v=1613793664" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/1_0d5f3575-0151-45aa-9aef-72353b0e63e2.png?v=1613793664" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/2.png?v=1613793664" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/4.png?v=1613793664" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="https://boyka-demo.myshopify.com/cdn/shop/files/3.png?v=1613793664" alt="" /></SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    );
}
