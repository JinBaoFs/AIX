import { 
    Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Box,
    Text
} from "@chakra-ui/react"
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useThemedCardColors } from "@w/hooks/useThemedColors";

const SignMessageStr = 'Welcome to AIX';

function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { address } = useAccount()
  const colors = useThemedCardColors()

  useEffect(()=>{
    if(address){
        onOpen()
    }
  },[address])
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent width={"80%"}>
          <ModalHeader textAlign="center">Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
                <Text>{ SignMessageStr }</Text>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              bg={colors.main}
              color={colors.textMain}
              rounded="full"
              fontSize="md"
            >请连接钱包授权</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal;