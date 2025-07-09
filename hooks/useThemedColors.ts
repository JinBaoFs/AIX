// hooks/useThemedColors.js
import { useColorModeValue } from '@chakra-ui/react'

export const useThemedCardColors = () => ({
  main: useColorModeValue('#A2EE30','#A2EE30'),
  bg: useColorModeValue('#000', '#000'),
  headBg: useColorModeValue('#101010',"#101010"),
  noticBg: useColorModeValue('#1E1E1E',"#1E1E1E"),
  textMain: useColorModeValue('#fff',"#000"),
  textTips: useColorModeValue('#555555',"#555555"),
  textPrimary: useColorModeValue('#A2EE30',"#A2EE30"),
  borderPrimary: useColorModeValue('#A2EE30', '#A2EE30'),
  tabBg: useColorModeValue('#2E2C2C','#2E2C2C'),
  tabActiveBg: useColorModeValue('#3B3B3B','#3B3B3B'),


  title: useColorModeValue('gray.800', 'whiteAlpha.900'),
  desc: useColorModeValue('gray.600', 'gray.400'),
  
})
