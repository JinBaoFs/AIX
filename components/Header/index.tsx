"use client";

import { useLocale } from "next-intl";
import { useChangeLng } from '@/i18n/routing';
import { useSearchParams } from "next/navigation";
import { 
  Center, 
  Flex, 
  Box, 
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  useColorMode
} from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CheckIcon } from "@chakra-ui/icons";
import { LANGITEM } from "@w/types/global";
import { useThemedCardColors } from '@w/hooks/useThemedColors'
import CustomWalletButton from "@w/components/CustomWalletButton";

const LANGS = [
  {
    name: '中文',
    value: 'zh',
  },
  {
    name: 'English',
    value: 'en'
  }
]


export default function Header(){

  const locale = useLocale();
  const { changeLang } = useChangeLng()
  const searchParams = useSearchParams().toString();

  const { colorMode, toggleColorMode } = useColorMode();
  const colors = useThemedCardColors();

  const changeLanguage = (item:LANGITEM) => {
    changeLang(item.value,searchParams)
  }

  return (
    <Center
      justifyContent={'space-between'}
      h={'80px'}
      px={'5'}
      margin={'0 auto'}
      bg={colors.headBg}
    >
      <Box>
        <Image 
          src='/images/logo.png' 
          alt=''
          w="70px"
        />
      </Box>
      <Flex alignItems={'center'}>
        <Image 
          src={ `/images/menu.png`}
          alt=''
          w="32px"
          h="32px"
          mr="5"
        />
        <Image 
          src={ `/images/lang.png`}
          alt=''
          w="32px"
          h="32px"
          mr="5"
        />
        <Box mr={2}>
          {/* <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} /> */}
          <CustomWalletButton></CustomWalletButton>
        </Box>
        {/* <Menu isLazy>
          <MenuButton borderRadius={'4px'} p={'6px'} _hover={{background:'#e5e5e5'}} bgColor={colors.main}>
            <Flex alignItems={'center'}>
              <Image 
                src='/images/lang.png' 
                alt=''
                w="24px"
                h="24px"
              />
            </Flex>
          </MenuButton>
          <MenuList fontSize={'14px'}>
            { LANGS.map((item) => <MenuItem key={item.value} 
                  onClick={ ()=> changeLanguage(item) } 
                  sx={{
                    color: item.value === locale ? '#4e9cff' : colorMode == 'light' ? '#333' : 'white',
                    background: 'none',
                  }}
                >
                <Flex alignItems={'center'}>
                  <Text>{ item.name }</Text>
                  {
                    locale === item.value && 
                    <CheckIcon fontSize={'12px'} ml={1}></CheckIcon>
                  }
                </Flex>
              </MenuItem>)
            }
          </MenuList>
        </Menu> */}

      </Flex>
    </Center>
  )
}