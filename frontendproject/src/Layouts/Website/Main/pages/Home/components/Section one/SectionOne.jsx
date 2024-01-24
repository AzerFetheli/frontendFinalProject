import React from 'react'
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import "./SectionOne.css"

import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export default function SectionOne() {

    return (
        <div className='sectionOne'>
            <Swiper className="mySwiper"
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Navigation]}>
                <SwiperSlide> <div className='sliderImage'>
                    <div className='text'>
                        <p className='text1'>Classic Leather Accessories</p>
                        <p className='text2'>Amazing For Men's</p>
                        <p className='text3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, dolor?</p>
                        <p className='text4'>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                        <Link to={"/shop"}> <button type='submit' className='shopNow'>+Shop Now</button></Link>
                    </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='sliderImage1'>
                        <div className='text'>
                            <p className='text1'>Classic Leather Accessories</p>
                            <p className='text2'>Amazing For Men's</p>
                            <p className='text3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, dolor?</p>
                            <p className='text4'>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            <Link to={"/shop"}> <button type='submit' className='shopNow'>+Shop Now</button></Link>
                        </div>
                    </div>

                </SwiperSlide>
            </Swiper>
        </div>
    )
}
