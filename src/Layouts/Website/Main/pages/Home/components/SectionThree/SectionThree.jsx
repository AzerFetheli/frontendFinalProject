import React, { useEffect, useState } from 'react'
import "./SectionThree.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Card from './components/Card';
import {  getSiteProducts } from '../../../../../../../Services/Products';


export default function SectionThree() {
    const [siteProduct, setSiteProduct] = useState([])

    useEffect(() => {
        getSiteProducts().then((res) => {
            console.log(res.data)
            setSiteProduct(res.data.product)
        })
    }, [])

    

 


    return (
        <section className="sectionThree">
            <div className="sectionThreeContainer">
                <div className='sectionThreeLeft'></div>
                <div className='sectionThreeRight'>
                    <div className='sectionThreeText'></div>
                    <div className='sectionThreeSlider'>
                        <Swiper slidesPerView={2} spaceBetween={30} modules={[Pagination]} loop={true}
                            breakpoints={{

                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 30
                                },
                                401: {
                                    slidesPerView: 2,
                                    spaceBetween: 30
                                },
                                1500: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                }

                            }}
                            className="mySwiper">
                            {siteProduct.map((item) => {
                                return (
                                    <SwiperSlide key={item._id}>
                                        <Card key={item._id} item={item} />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}
