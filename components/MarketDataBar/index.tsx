// components/MarketDataBar.tsx
'use client';
import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useThemedCardColors } from '@w/hooks/useThemedColors'

const MarketDataBar = () => {
  const colors = useThemedCardColors()
  return (
    <Box 
      bg="black" 
      color="white" 
      py={2} 
      px={4} 
      className="border-r-2 border-pink-600"
    >
      <Flex 
        direction="row" 
        alignItems="center" 
        gap={4} 
        flexWrap="nowrap"
        overflowX="auto"
      >
        <Text fontSize="10px" whiteSpace="nowrap">
          AIX Price: <Text as="span" color={colors.main}>$0.003U</Text>
        </Text>

        <Text fontSize="10px" whiteSpace="nowrap">
          AIX-USDT Pair: 12.34M AIX / 37.02K USDT
        </Text>
      </Flex>
    </Box>
  );
};

export default MarketDataBar;