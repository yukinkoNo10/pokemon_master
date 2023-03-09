import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Header() {
    const { data: session } = useSession();
    return (
        <Box display="flex" justifyContent="space-between" mb="80px">
            <span></span>
            <Heading pl="100px">ポケットモンスター</Heading>
            {session ?
                <Box display="flex">
                    <Text m="10px">{session.user.name}</Text>
                    <Button onClick={() => signOut({callbackUrl: 'http://localhost:3000'})}>Sign out</Button>
                </Box>
                :
                <Box>
                    <Button onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}>Sign in</Button>
                </Box>
            }
        </Box>

    )
}