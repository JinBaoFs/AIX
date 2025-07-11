// theme/components/button.ts
import type { ComponentStyleConfig } from '@chakra-ui/react'

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'lg',
  },
  sizes: {
    md: {
      fontSize: 'md',
      px: 6,
      py: 3,
    },
  },
  variants: {
    solid: {
      bg: '#A2EE30',
      color: '#000000',
      _hover: {
        bg: '#A2EE30',
      },
      _active: {
        bg: '#000000',
      },
    },
    outline: {
      borderColor: 'orange.500',
      color: 'orange.500',
      _hover: {
        bg: 'orange.50',
      },
      _active: {
        bg: 'orange.100',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
}
