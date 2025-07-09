import { useTranslations } from 'next-intl';
import { Text } from '@chakra-ui/react';
import MarketDataBar from '@w/components/MarketDataBar';
import AnnouncementBar from '@w/components/AnnouncementBar'
import Carousel from '@w/components/Carousel';

const announcements = [
  'Circle applied to set up a National Trust Bank Robinhood in the',
  'This is a book ETH or and BRITHER kari or ping guo',
  'Circle applied to set up a National Trust Bank Robinhood in the',
  'Circle applied to set up a National Trust Bank Robinhood in the',
];

  const items = [
    {
      id: '1',
      content: (
        <div className="bg-blue-500 h-64 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
          Slide 1
        </div>
      ),
    },
    {
      id: '2',
      content: (
        <div className="bg-green-500 h-64 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
          Slide 2
        </div>
      ),
    },
    {
      id: '3',
      content: (
        <div className="bg-yellow-500 h-64 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
          Slide 3
        </div>
      ),
    },
    {
      id: '4',
      content: (
        <div className="bg-red-500 h-64 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
          Slide 4
        </div>
      ),
    },
  ];


export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      {/* 通知 */}
      <AnnouncementBar messages={announcements}
        speed={80}
        py={2} 
      />

      {/* 平台代币信息 */}
      <MarketDataBar />
      

      {/* <Text>{t('hello')}</Text> */}
    </div>
  );
}
