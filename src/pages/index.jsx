import { Text, Button, Box, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import Header from "@/components/allpage/Header";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();

  const departure = () => {
    const pokeId = Math.floor(Math.random() * 1008);
    router.push(`/buttle/${pokeId}`);
  }

  const confirmBox = () => {
    router.push("/pokemon/pokeBox")
  }

  return (
    <Box>
      <Header session={session} />
      <Box m="50px">
        <Box className="base">
          <Box className="center">
            <button className="center-button"></button>
          </Box>
        </Box>
        <Box className="shadow"></Box>
      </Box>
      {session ?
        <Center>
          <Button mr="10px" onClick={departure}>冒険に出る</Button>
          <Button mr="10px" onClick={confirmBox}>ボックス確認</Button>
        </Center>
        :
        <Text textAlign="center" fontSize="xl">ログインしてください</Text>
        }
    </Box>
  )
}
