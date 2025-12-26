// hooks/useUSDTApproval.ts
import { 
  useAccount, 
  useChainId, 
  useSwitchChain, 
  useWriteContract, 
  useWaitForTransactionReceipt, 
  useReadContract,
  usePublicClient
} from 'wagmi'
import { USDT_ADDRESSES, USDT_ABI } from '@w/constants/contracts'
import { parseUnits, formatUnits, maxUint256 } from 'viem'
import { useCallback, useEffect, useState } from 'react'
import { bsc, mainnet } from 'wagmi/chains'

export interface ApprovalConfig {
  spender: `0x${string}`
  amount?: string
  chainId?: number
}

export const useUSDTApproval = (defaultSpender?: `0x${string}`) => {
  const { address, chain } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const chainId = useChainId()
  const publicClient = usePublicClient()
  
  const [currentChainId, setCurrentChainId] = useState<number>(chainId)
  const [currentSpender, setCurrentSpender] = useState<`0x${string}` | undefined>(defaultSpender)
  const [isApproving, setIsApproving] = useState(false)
  const [error, setError] = useState<string>('')
  const [decimalsCache, setDecimalsCache] = useState<Record<number, number>>({})

  // 获取当前链的 USDT 地址
  const getUSDTAddress = useCallback((targetChainId?: number): `0x${string}` | null => {
    const chainIdToUse = targetChainId || currentChainId
    const address = USDT_ADDRESSES[chainIdToUse as keyof typeof USDT_ADDRESSES]
    return address || null
  }, [currentChainId])

  // 检查当前链是否支持
  const isChainSupported = useCallback((targetChainId?: number): boolean => {
    const chainIdToUse = targetChainId || currentChainId
    return chainIdToUse in USDT_ADDRESSES
  }, [currentChainId])

  // 使用 useReadContract 获取 decimals
  const { data: decimalsData } = useReadContract({
    address: getUSDTAddress() as `0x${string}`,
    abi: USDT_ABI,
    functionName: 'decimals',
    chainId: currentChainId,
    query: {
      enabled: !!getUSDTAddress(),
    },
  })

  // 获取当前授权额度
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: getUSDTAddress() as `0x${string}`,
    abi: USDT_ABI,
    functionName: 'allowance',
    args: address && getUSDTAddress() && currentSpender ? 
      [address, currentSpender] : undefined,
    chainId: currentChainId,
    query: {
      enabled: !!address && !!getUSDTAddress() && !!currentSpender,
    },
  })

  // 写入合约（授权）
  const { 
    data: hash,
    writeContractAsync,
    isPending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract()

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
    chainId: currentChainId,
  })

  // ✅ 修正：在授权时获取 decimals
  const approve = useCallback(async (
    config: ApprovalConfig
  ): Promise<{ success: boolean; hash?: `0x${string}`; message?: string }> => {
    try {
      setIsApproving(true)
      setError('')
      resetWrite()
      
      setCurrentSpender(config.spender)

      const targetChainId = config.chainId || currentChainId
      const usdtAddress = getUSDTAddress(targetChainId)

      // 1. 检查链是否支持
      if (!isChainSupported(targetChainId)) {
        throw new Error(`链 ${targetChainId} 不支持 USDT`)
      }

      // 2. 检查是否已连接钱包
      if (!address) {
        throw new Error('请先连接钱包')
      }

      if (!usdtAddress) {
        throw new Error('未找到该链的 USDT 合约地址')
      }

      // 3. 检查是否需要切换链
      if (targetChainId !== chainId && chain?.id !== targetChainId) {
        try {
          await switchChainAsync({ chainId: targetChainId })
          setCurrentChainId(targetChainId)
        } catch (switchError) {
          throw new Error('请手动切换到目标网络')
        }
      }

      // ✅ 修正：使用 publicClient.readContract 获取 decimals
      let decimals: number
      
      // 检查缓存
      if (decimalsCache[targetChainId]) {
        decimals = decimalsCache[targetChainId]
      } else {
        try {
          // 使用 Wagmi 的 publicClient
          const decimalsResult = await publicClient?.readContract({
            address: usdtAddress,
            abi: USDT_ABI,
            functionName: 'decimals',
          }) as number
          
          decimals = decimalsResult
          
          // 更新缓存
          setDecimalsCache(prev => ({
            ...prev,
            [targetChainId]: decimals
          }))
        } catch (error) {
          console.error('读取 decimals 失败:', error)
          // USDT 通常是 6 位小数，使用默认值
          decimals = 6
          setDecimalsCache(prev => ({
            ...prev,
            [targetChainId]: decimals
          }))
        }
      }

      // 4. 计算授权金额
      let approveAmount: bigint
      if (config.amount === 'infinite' || config.amount === 'max') {
        approveAmount = maxUint256
      } else if (config.amount) {
        approveAmount = parseUnits(config.amount, decimals)
      } else {
        approveAmount = maxUint256
      }

      // 5. 执行授权
      const hash = await writeContractAsync({
        address: usdtAddress,
        abi: USDT_ABI,
        functionName: 'approve',
        args: [config.spender, approveAmount],
        chainId: targetChainId,
      })

      return {
        success: true,
        hash,
        message: '授权请求已发送，请等待确认',
      }
    } catch (err: any) {
      const message = err.message || '授权失败'
      setError(message)
      return {
        success: false,
        message,
      }
    } finally {
      setIsApproving(false)
    }
  }, [
    address, chainId, chain, currentChainId, 
    getUSDTAddress, isChainSupported, switchChainAsync, 
    writeContractAsync, resetWrite, decimalsCache,
    publicClient // ✅ 添加 publicClient 到依赖
  ])

  // 快捷方法
  const approveOnETH = useCallback((spender: `0x${string}`, amount?: string) => {
    return approve({
      spender,
      amount,
      chainId: mainnet.id,
    })
  }, [approve])

  const approveOnBSC = useCallback((spender: `0x${string}`, amount?: string) => {
    return approve({
      spender,
      amount,
      chainId: bsc.id,
    })
  }, [approve])

  // 格式化授权额度
  const formatAllowance = useCallback((value?: bigint, targetDecimals?: number): string => {
    if (!value) return '0'
    if (value === maxUint256) return '无限'
    
    const decimalsToUse = targetDecimals || (decimalsData as number) || 6
    return formatUnits(value, decimalsToUse)
  }, [decimalsData])

  // 监听链变化
  useEffect(() => {
    if (chainId && chainId !== currentChainId) {
      setCurrentChainId(chainId)
    }
  }, [chainId, currentChainId])

  // 监听交易确认后刷新授权额度
  useEffect(() => {
    if (isConfirmed && address) {
      refetchAllowance()
    }
  }, [isConfirmed, address, refetchAllowance])

  return {
    // 状态
    isApproving: isApproving || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    error: error || (writeError?.message || ''),
    hash,
    allowance,
    formattedAllowance: formatAllowance(allowance as bigint),
    currentSpender,
    decimals: decimalsData as number,
    
    // 方法
    approve,
    approveOnETH,
    approveOnBSC,
    
    // 信息
    currentChainId,
    currentUSDTAddress: getUSDTAddress(),
    isCurrentChainSupported: isChainSupported(),
    
    // 工具方法
    getUSDTAddress,
    isChainSupported,
    refetchAllowance,
    setCurrentSpender,
    formatAllowance,
  }
}