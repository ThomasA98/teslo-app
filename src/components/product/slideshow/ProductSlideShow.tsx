'use client'
import { useState } from 'react';
import { Swiper as SwipperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css'
import Image from 'next/image';

export interface ProductSlideShowProps {
    images: string[]
    title: string
    className?: string
}

export const ProductSlideShow: React.FC<ProductSlideShowProps> = ({ images, title, className }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwipperObject>();

  return (
    <div className={ className }>
    <Swiper
        spaceBetween={10}
        navigation={true}
        autoplay={{
            delay: 2_500,
        }}
        thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
            images.map(image => (
                <SwiperSlide key={ image }>
                    <Image
                        src={ `/products/${ image }` }
                        alt={ title }
                        className='rounded-lg object-fill'
                        width={ 1024 }
                        height={ 800 }
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
            images.map(image => (
                <SwiperSlide key={ image }>
                    <Image
                        src={ `/products/${ image }` }
                        alt={ title }
                        className='rounded-lg object-fill'
                        width={ 300 }
                        height={ 300 }
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}