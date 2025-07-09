'use client'

import { Box, Image, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import './styles.css' // 你需要创建并引入这个 CSS 文件

const slides = [
  { image: '/images/banner01.png', title: 'Wealth growth in encryption' },
  { image: '/images/banner01.png', title: 'Secure crypto future' },
  { image: '/images/banner01.png', title: 'Trade smarter' },
]

export default function Carousel() {
  return (
    <Box px={4} pt={2}>
      {/* 自定义分页容器，放在 Swiper 上面 */}
      <Box className="custom-swiper-pagination" />

      <Swiper
        slidesPerView="auto"
        centeredSlides
        spaceBetween={16}
        grabCursor
        pagination={{
          el: '.custom-swiper-pagination',
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} style={{ width: '280px' }}>
            <Box overflow="hidden" boxShadow="lg" borderRadius="md">
              <Image src={slide.image} alt={slide.title} borderRadius="md" />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
