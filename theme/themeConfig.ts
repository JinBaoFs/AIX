'use client';
/* theme.ts */
import { extendTheme } from "@chakra-ui/react";
import { Button } from './components/button'

const theme = extendTheme({
  components: {
    Button,
  },
  config: {
    initialColorMode: "dark",  // 设置初始模式为 light（白天模式）
    useSystemColorMode: false,  // 是否根据系统设置的颜色模式
  },
  colors: {
    brand: {
      50: '#e5f2ff',
      100: '#99c2ff',
      200: '#66a3ff',
      300: '#3385ff',
      400: '#0066ff',
      500: '#0052cc',
      600: '#003d99',
      700: '#002966',
      800: '#001533',
      900: '#00040d',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#fff',
        color: 'gray.800',
      },
      // 支持不同颜色模式的样式
      '.chakra-ui-dark &': {
        bg: '#000000',
        color: 'white',
      },
    },
  },
});

export default theme;