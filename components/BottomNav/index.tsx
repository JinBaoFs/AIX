'use client'

import { Flex, Text, Image } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useNav } from '@w/context/navContext'
import { useThemedCardColors } from '@w/hooks/useThemedColors'
import { useLocale } from "next-intl";
import Link from 'next/link'

const MotionFlex = motion(Flex)

const navItems = [
  {
    label: 'Home',
    path: '/',
    icon: '/images/nav_01_default.png',
    activeIcon: '/images/nav_01_active.png',
  },
  {
    label: 'Publish',
    path: '/publish',
    icon: '/images/nav_02_default.png',
    activeIcon: '/images/nav_02_active.png',
  },
  {
    label: 'Involved',
    path: '/vote',
    icon: '/images/nav_03_default.png',
    activeIcon: '/images/nav_03_active.png',
  },
  {
    label: 'Me',
    path: '/me',
    icon: '/images/nav_04_default.png',
    activeIcon: '/images/nav_04_active.png',
  },
]

export default function AnimatedBottomNav() {

  const colors = useThemedCardColors();
  const pathname = usePathname();
  const router = useRouter();
  const { isNavOpen } = useNav();

  const locale = useLocale()

  // 移除语言前缀的路径
  const rawPath = pathname.replace(new RegExp(`^/${locale}`), '') || '/';

  // 或者直接使用包含语言前缀的完整路径
  const fullPath = rawPath;

  return (
    <AnimatePresence>
      {isNavOpen && (
        <MotionFlex
          position="fixed"
          bottom="20px"
          left="10%"
          width="80%"
          px={4}
          py={2}
          borderRadius="full"
          bg={colors.tabBg}
          gap={3}
          zIndex={99}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          justifyContent={'space-between'}
        >
          {navItems.map((item) => {
            const isActive = fullPath === item.path
            return (
              <Link href={`/${locale}${item.path}`} locale={locale} key={item.path}>
                <Flex
                  cursor="pointer"
                  p={3}
                  borderRadius="full"
                  align="center"
                  bg={isActive ? colors.tabActiveBg : 'transparent'}
                  transition="all 0.2s"
                >
                  <Image
                    src={isActive ? item.activeIcon : item.icon}
                    alt={item.label}
                    boxSize="22px"
                    mr={isActive ? 2 : 0}
                  />
                  {isActive && (
                    <Text fontSize="sm" fontWeight="medium" color="white">
                      {item.label}
                    </Text>
                  )}
                </Flex>
              </Link>
              
            )
          })}
        </MotionFlex>
      )}
    </AnimatePresence>
  )
}
