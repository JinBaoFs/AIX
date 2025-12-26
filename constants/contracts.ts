// constants/contracts.ts
export const USDT_ADDRESSES = {
  [1]: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // eth主网
  [56]: '0x55d398326f99059fF775485246999027B3197955', // bsc主网
  [5]: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9', // Goerli
  [97]: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd', // BSC Testnet
} as const

// USDT ABI (简化版，只包含必要方法)
export const USDT_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
] as const