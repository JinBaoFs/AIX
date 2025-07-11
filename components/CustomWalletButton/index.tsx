import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useThemedCardColors } from '@w/hooks/useThemedColors'
import { Button } from "@chakra-ui/react"

export default function CustomWalletButton() {
  const colors = useThemedCardColors();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        openAccountModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    rounded="full"
                    fontWeight="bold"
                    variant={'solid'}
                  >
                    Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    rounded="full"
                    variant={'solid'}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  onClick={openAccountModal}
                  rounded="full"
                  variant={'solid'}
                >
                  {account.displayName}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
