import { Box, Text, Image } from '@chakra-ui/react';

export default function Card({name, img, size="150px"}) {
    return (
            <Box bg="white" boxShadow="xl" rounded="xl" p="6" overflow="hidden" w={size} margin="0 auto">
                <Box bg="tomato" mt="-6" mx="-6" pos="relative" h="60px">
                    <Text color="gray.200" textAlign="center" pt="5">{name}</Text>
                </Box>
                <Image boxSize={size - 50} w="30" fallbackSrc={img} layout="fill" />
            </Box>
    )
}