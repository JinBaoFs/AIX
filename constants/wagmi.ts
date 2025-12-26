import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  trustWallet,
  argentWallet
} from '@rainbow-me/rainbowkit/wallets';
import {
  bsc,
  mainnet
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'AIX',
  projectId: '4a6d9c959064316cc282c1a80420ad50',
  chains: [bsc,mainnet],
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet,
        metaMaskWallet,
        rainbowWallet
      ]
    },
    {
      groupName: 'Other',
      wallets: [trustWallet, argentWallet]
    }
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});