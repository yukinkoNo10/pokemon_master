import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Center, Heading, Button, Text } from '@chakra-ui/react';
import Card from '@/components/buttle/Card';
import ActionButton from '@/components/buttle/ActionButton';
import HpBar from '@/components/buttle/HpBar';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { add } from '@/redux/pokeBoxSlice';
import Header from '@/components/allpage/Header';

export default function ButtlePage({ id }) {
    const dispatch = useDispatch();
    const router = useRouter()
    const [feature, setFeature] = useState({});
    const [sumDamage, setSumDamage] = useState(0);
    const [isGet, setIsGet] = useState();

    useEffect(() => {
        const createButtlePoke = async () => {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => res.data);
            console.log(result)
            let img = result.sprites.other.home.front_default;
            if (Math.floor(Math.random() * 1024) === 1) {
                img = result.sprites.other.home.front_shiny;
            }
            const speciesUrl = result.species.url;
            const responseSpecies = await axios.get(speciesUrl);
            const names = responseSpecies.data.names;
            const jpName = names.find((v) => v.language.name == "ja");
            const level = Math.floor(Math.random() * 70) + 30;
            setFeature({ id: Date.now(), pokeId: id, name: jpName.name, img, level });
        }
        createButtlePoke()
    }, [])

    useEffect(() => {
        if (isGet) {
            router.push(`/buttle/get?pokemon=${feature.name}&img=${feature.img}`);
            dispatch(add(feature));
        }
    }, [isGet])

    const redirectHome = () => {
        router.push("/");
    }

    return (
        <>
            <Header />
            {sumDamage < 100 ?
                <Box>
                    <Center>
                        <Heading size="md" mb="10px" >{feature.name}があらわれた！</Heading>
                    </Center>
                    {isGet !== undefined && !isGet ? <Text mb="10px" textAlign="center">おしい！あと少しだったのに...</Text> : undefined}
                    <HpBar name={feature.name} sumDamage={sumDamage} level={feature.level} />
                    <Box mt="20px">
                        <Card name={feature.name} img={feature.img} />
                    </Box>
                    <Center mt="30px">
                        <ActionButton damageProps={[sumDamage, setSumDamage]} getProps={[isGet, setIsGet]} level={feature.level} />
                    </Center>
                </Box> :
                <Box>
                    <Center>
                        <Heading size="md" mb="10px" mt="30px">{feature.name}をたおした！</Heading>
                    </Center>
                    <HpBar name={feature.name} sumDamage={100} level={feature.level} />
                    <Box mt="20px">
                        <Card name={feature.name} img={feature.img} />
                    </Box>
                    <Center mt="30px">
                        <Button onClick={redirectHome}>ポケモンセンターに戻る</Button>
                    </Center>
                </Box>}
        </>
    )
}

export async function getServerSideProps(context) {
    const id = context.query.id;
    return {
        props: { id }
    }
}