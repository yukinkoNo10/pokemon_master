import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "@/components/buttle/Card";
import { Heading, Box, Text, Button } from "@chakra-ui/react";

export default function encyclopediaPage() {
    const router = useRouter();
    const pokeId = router.query.pokeId;
    const [dispPoke, setDispPoke] = useState({});

    useEffect(() => {
        const getPokeInfo = async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`)
                .then(res => res.data);

            // 画像取得
            const img = response.sprites.other.home.front_default;

            // ポケモン種族情報取得.
            const speciesUrl = response.species.url;
            const responseSpecies = await axios.get(speciesUrl);

            console.log(response)
            console.log(responseSpecies)

            //名前取得
            const names = responseSpecies.data.names;
            const jpName = names.find((v) => v.language.name == "ja");


            //何ポケモン
            const genera = responseSpecies.data.genera[0].genus;


            // 説明文.
            const flavorTextEntries = responseSpecies.data.flavor_text_entries;
            let flavorText = flavorTextEntries.filter(function (v) {
                return (v.language.name == "ja") && (v.version.name == "sword");
            });
            if (flavorText.length == 0) {
                // バージョンをYで取得し直す.
                flavorText = flavorTextEntries.filter(function (v) {
                    return (v.language.name == "ja") && (v.version.name == "y");
                });
            }
            if (flavorText.length == 0) {
                // バージョンをサンで取得し直す.
                flavorText = flavorTextEntries.filter(function (v) {
                    return (v.language.name == "ja") && (v.version.name == "sun");
                });
            }
            console.log(flavorText);
            if (flavorText.length === 0) {
                console.log("aaa")
                flavorText = [{ flavor_text: "no data" }];
            }
            console.log(flavorText)
            setDispPoke({ number: response.id, species: genera, img, content: flavorText[0].flavor_text, name: jpName.name })
            console.log(dispPoke)
        }
        getPokeInfo();
    }, [])

    const goBox = () => {
        router.push("/pokemon/pokeBox");
    }

    return (
        <>
            <Box m="30px" display="flex" justifyContent="center">
                <Heading textAlign="center">ポケモン図鑑</Heading>
            </Box>
            {dispPoke.content !== "no data" ?
                <Box mt="50px" display="flex">
                    <Card name={dispPoke.name} img={dispPoke.img} size={"300px"} />
                    <Box >
                        <Text mt="10px" w="300px" fontSize="2xl">No. {dispPoke.number}</Text>
                        <Text fontSize="2xl" mt="10px">分類: {dispPoke.species}</Text>
                        <Text mt="50px" textAlign="center" w="300px" fontSize="2xl">{dispPoke.content}</Text>
                    </Box>
                </Box>
                :
                <Box mt="50px" display="flex">
                    <Card name={dispPoke.name} img={dispPoke.img} size={"300px"} />
                    <Box >
                        <Text mt="10px" w="300px" fontSize="2xl">No. 準備中...🙏</Text>
                        <Text fontSize="2xl" mt="10px">分類: 準備中...🙏</Text>
                        <Text mt="50px" textAlign="center" w="300px" fontSize="2xl">準備中...🙏</Text>
                    </Box>
                </Box>
            }
            <Box w="100%" display="flex" justifyContent="center">
                <Button m="50px auto" ml="10px" onClick={goBox}>ボックスに戻る</Button>
            </Box>
        </>
    )
}