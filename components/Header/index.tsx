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
import { useNav } from '@w/context/navContext'

const LANGS = [
  {
    name: '简体中文',
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
  const { toggleNav } = useNav()

  const changeLanguage = (item:LANGITEM) => {
    changeLang(item.value,searchParams)
  }

  return (
    <Center
      justifyContent={'space-between'}
      h={'70px'}
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
          alt='menu'
          w="28px"
          h="28px"
          mr="5"
          onClick={toggleNav}
        />
        
        <Menu isLazy>
          <MenuButton>
            <Image 
              src={ `/images/lang.png`}
              alt='lang'
              w="28px"
              h="28px"
              mr="5"
            />
          </MenuButton>
          <MenuList fontSize={'14px'} border="none" bg={colors.noticBg} minWidth={"120px"} py={0}>
            { LANGS.map((item) => 
              <MenuItem key={item.value} 
                  onClick={ ()=> changeLanguage(item) } 
                  sx={{
                    color: colors.textTips,
                    background: item.value === locale ? colors.tabActiveBg : 'none',
                  }}
                  height={"50px"}
                  overflow={"hidden"}
                  borderRadius={"4px"}
                >
                <Flex alignItems={'center'} width={'120px'} justifyContent={"center"}>
                  <Text>{ item.name }</Text>
                </Flex>
              </MenuItem>)
            }
          </MenuList>
        </Menu>
        <Box mr={2}>
          {/* <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} /> */}
          <CustomWalletButton></CustomWalletButton>
        </Box>

      </Flex>
    </Center>
  )
}