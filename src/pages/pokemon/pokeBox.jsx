import Card from "@/components/buttle/Card";
import { Box, Heading, Button } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';

export default function pokeBoxPage() {
    const router = useRouter();
    const pokemons = useSelector((state) => state.pokeBox.pokemons)

    const goPedia = (pokeId) => {
        router.push(`/pokemon/encyclopedia?pokeId=${pokeId}`)
    }

    const goHome = () => {
        router.push("/");
    }

    return (
        <>
            <Box mb="30px" display="flex" justifyContent="center">
                <Heading>ポケモンボックス</Heading>
            </Box>
            <Box justifyContent="center" display="flex" flexWrap="wrap">
                {pokemons.map((pokemon) => (
                    <Box onClick={() => goPedia(pokemon.pokeId)} key={pokemon.id} m="10px">
                        <Card name={pokemon.name} img={pokemon.img} />
                    </Box>
                ))}
            </Box>
            <Box w="100%" display="flex" justifyContent="center">
                <Button m="0 auto" ml="10px" onClick={goHome}>トップページに戻る</Button>
            </Box>
        </>
    )
}