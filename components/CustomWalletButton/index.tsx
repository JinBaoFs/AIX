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
                    bg={colors.main}
                    color={colors.textMain}
                    rounded="full"
                    fontWeight="bold"
                  >
                    Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    className="px-4 py-2 bg-red-500 text-white rounded-full"
                    rounded="full"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  onClick={openAccountModal}
                  className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                  rounded="full"
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
