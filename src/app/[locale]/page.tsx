'use client'

import { useTranslations } from 'next-intl';
import { Text, Button } from '@chakra-ui/react';
import MarketDataBar from '@w/components/MarketDataBar';
import AnnouncementBar from '@w/components/AnnouncementBar'
import Carousel from '@w/components/Carousel';
import { postData } from '@w/hooks/usePost';

const announcements = [
  'Circle applied to set up a National Trust Bank Robinhood in the',
  'This is a book ETH or and BRITHER kari or ping guo',
  'Circle applied to set up a National Trust Bank Robinhood in the',
  'Circle applied to set up a National Trust Bank Robinhood in the',
];

export default function HomePage() {
  const t = useTranslations('HomePage');

  const handleSubmit = async () => {
    // console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
    const res = await postData(
      '/oauth/token',
      {
        username: "tom", 
        password: "123456",
        grant_type: "password"
      },
      {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0"
      }
    )
  }
  return (
    <div>
      {/* 通知 */}
      <AnnouncementBar messages={announcements}
        speed={80}
        py={2} 
      />

      {/* 平台代币信息 */}
      <MarketDataBar />

      {/* 轮播图 */}
      <Carousel></Carousel>
      

      {/* <Text>{t('hello')}</Text> */}
    </div>
  );
}
