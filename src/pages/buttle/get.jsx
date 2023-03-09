import { Heading, Image, Center, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function capturePage() {
    const router = useRouter();
    const pokeName = router.query.pokemon;
    const imgPath = router.query.img;

    const redirectHome = () => {
        router.push("/");
    }

    return (
        <>
            <Heading textAlign="center">やったね！{pokeName}を捕まえた！</Heading>
            <Center>
                <Image w="200px" src={imgPath} />
                <Button onClick={redirectHome}>ポケモンセンターに戻る</Button>
            </Center>
        </>
    )
}