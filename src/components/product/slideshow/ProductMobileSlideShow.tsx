'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './styles.css'
import Image from 'next/image';

export interface ProductMobileSlideShowProps {
    images: string[]
    title: string
    className?: string
}

export const ProductMobileSlideShow: React.FC<ProductMobileSlideShowProps> = ({ images, title, className }) => {
  return (
    <div className={ className }>
    <Swiper
        style={{
          width: '100%',
          height: '500px',
        }}
        navigation={true}
        autoplay={{
            delay: 2_500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
            images.map(image => (
                <SwiperSlide key={ image }>
                    <Image
                        src={ `/products/${ image }` }
                        alt={ title }
                        className='object-fill'
                        width={ 600 }
                        height={ 500 }
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}