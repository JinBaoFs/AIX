import { useUSDTApproval } from '@w/hooks/useUSDTApproval'

export default function TestApprov() {
  const SPENDER_ADDRESS = '0x01b9c1Aa1313a2Bb297B2b40032D1344B51b2ea3' as `0x${string}`
  
  const {
    approve,
    approveOnETH,
    approveOnBSC,
    isApproving,
    allowance,
    formattedAllowance,
    decimals,
  } = useUSDTApproval(SPENDER_ADDRESS)

  const handleApproveETH = async () => {
    const result = await approveOnETH(SPENDER_ADDRESS, '1000')
    if (result.success) {
      console.log('ETH 授权成功:', result.hash)
    }
  }
  
  const handleApproveBSC = async () => {
    const result = await approveOnBSC(SPENDER_ADDRESS, 'infinite')
    if (result.success) {
      console.log('BSC 无限授权成功:', result.hash)
    }
  }
  
  return (
    <div>
      <p>当前授权额度: {formattedAllowance} USDT</p>
      <p>小数位: {decimals}</p>
      
      <button onClick={handleApproveETH} disabled={isApproving}>
        授权 1000 USDT (ETH)
      </button>
      
      <button onClick={handleApproveBSC} disabled={isApproving}>
        无限授权 (BSC)
      </button>
    </div>
  )
}