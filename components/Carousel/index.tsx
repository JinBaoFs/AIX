'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';

interface CarouselProps {
  items: {
    id: string;
    content: React.ReactNode;
  }[];
  visibleItemCount?: number; // 可见项目数（奇数）
  itemWidth?: number; // 单个项目宽度
  itemGap?: number; // 项目间距
  peekAmount?: number; // 两侧预览的宽度
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  visibleItemCount = 3,
  itemWidth = 300,
  itemGap = 20,
  peekAmount = 60,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);

  // 计算容器宽度
  const containerWidth = itemWidth * visibleItemCount + itemGap * (visibleItemCount - 1);

  // 处理手势滑动
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = itemWidth / 3;
    if (info.offset.x < -threshold) {
      // 向左滑动
      goNext();
    } else if (info.offset.x > threshold) {
      // 向右滑动
      goPrev();
    } else {
      // 回到原位
      controls.start({ x: -currentIndex * (itemWidth + itemGap) });
    }
  };

  const goNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
    controls.start({ x: -newIndex * (itemWidth + itemGap) });
  };

  const goPrev = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);
    controls.start({ x: -newIndex * (itemWidth + itemGap) });
  };

  // 自动轮播（可选）
  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden" style={{ width: `${containerWidth}px` }}>
      {/* 轮播容器 */}
      <motion.div
        ref={carouselRef}
        className="flex"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={false}
        style={{
          gap: `${itemGap}px`,
          paddingLeft: `${peekAmount}px`,
          paddingRight: `${peekAmount}px`,
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`flex-shrink-0 relative transition-transform duration-300 ${
              index === currentIndex ? 'z-10' : 'z-0'
            }`}
            style={{
              width: `${itemWidth}px`,
              // 当前项放大，两侧项缩小
              scale: index === currentIndex ? 1.05 : 0.9,
            }}
            whileHover={{ scale: index === currentIndex ? 1.1 : 0.95 }}
          >
            {item.content}
          </motion.div>
        ))}
      </motion.div>

      {/* 导航箭头（可选） */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-80 transition"
        onClick={goPrev}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-80 transition"
        onClick={goNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 指示器（可选） */}
      <div className="flex justify-center mt-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              controls.start({ x: -index * (itemWidth + itemGap) });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;