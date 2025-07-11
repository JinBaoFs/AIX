import { 
  Modal, 
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  useDisclosure,
  useBoolean,
} from "@chakra-ui/react"
import { useEffect, useCallback } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useThemedCardColors } from "@w/hooks/useThemedColors";

const SignMessageStr = 'Welcome to AIX';

function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flag, setFlag] = useBoolean();
  const colors = useThemedCardColors();

  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  useEffect(()=>{
    if(address){
        onOpen()
    }
  },[address])

  const handleSign = useCallback(async() => {
    try{
      setFlag.on();
      const sign = await signMessageAsync({
        message: SignMessageStr
      })
      setFlag.off()
    }catch{
      setFlag.off()
    }
  },[setFlag, signMessageAsync, SignMessageStr])
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        
        <ModalContent width={"80%"} bg={colors.noticBg} position="relative"
          borderRadius="lg"
          _before={{
            content: `""`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            boxShadow: `inset 0 0 0 0.5px ${colors.main}`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <ModalHeader textAlign="center">Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
                <Text>{ SignMessageStr }</Text>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"center"} py={6}>
            <Button
              variant={'solid'}
              rounded="full"
              fontWeight="normal"
              fontSize="xs"
              isLoading={flag}
              onClick={handleSign}
            >前往钱包授权</Button>
          </ModalFooter>
        </ModalContent>
        
      </Modal>
    </>
  )
}

export default AuthModal;