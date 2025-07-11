// components/AnnouncementMarquee.tsx
'use client';

import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import { useThemedCardColors } from '@w/hooks/useThemedColors';

interface AnnouncementMarqueeProps {
  messages: string[];
  speed?: number;
  py?: string | number;
  px?: string | number;
  iconSrc?: string;
  iconAlt?: string;
}

function AnnouncementMarquee({
  messages = [],
  speed = 100,
  py = 2,
  px = 4,
  iconSrc = '/images/notice.png',
  iconAlt = 'menu'
}: AnnouncementMarqueeProps) {
  // 复制消息数组以实现无缝滚动
  const duplicatedMessages = [...messages, ...messages];
  const colors = useThemedCardColors()

  return (
    <Box 
      position="sticky"
      top="70px"
      zIndex="100"
    >
      <Box
        bg={colors.noticBg} // 可以替换为您的主题颜色
        color={colors.textTips}
        py={py}
        px={px}
        overflow="hidden"
        position="relative"
        width="100%"
      >
        <Flex align="center" alignItems="center">
          {/* 左侧固定公告图标 */}
          <Flex align="center" mr={2} mt={1} flexShrink={0}>
            <Image 
              src={iconSrc}
              alt={iconAlt}
              w="16px"
              h="16px"
            />
          </Flex>

          {/* 滚动文字区域 */}
          <Box overflow="hidden" flex="1">
            <Flex
              display="inline-flex"
              alignItems="center"
              animation={`scroll ${messages.length * (1000 / speed)}s linear infinite`}
              _hover={{ animationPlayState: 'paused' }}
              sx={{
                '@keyframes scroll': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' },
                },
              }}
            >
              {duplicatedMessages.map((message, index) => (
                <React.Fragment key={index}>
                  <Text
                    fontSize='xs'
                    display="inline-block"
                    px={2}
                    whiteSpace="nowrap"
                  >
                    {message}
                  </Text>
                </React.Fragment>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default AnnouncementMarquee;