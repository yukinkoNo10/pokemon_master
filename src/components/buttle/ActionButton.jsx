import { Button, Center } from "@chakra-ui/react"
import { useRouter } from "next/router";

export default function ActionButton({ damageProps, getProps,level }) {
    const router = useRouter();
    if (damageProps === undefined || getProps === undefined) {
        return
    }
    const [damage, setDamage] = damageProps;
    const [, setIsGet] = getProps;

    const onClickButtle = () => {
        const random = Math.floor(Math.random() * 100);
        setDamage(random + damage);
    }

    const onClickCapture = () => {
        const random = Math.floor(Math.random() * 100);
        console.log(random)
        let caputureRate = 10
        if (damage > 80) {
            caputureRate =70
        } else if (damage > 50) {
            caputureRate = 40
        }
        console.log(caputureRate)
        random < caputureRate ? setIsGet(true) : setIsGet(false);
    }

    const onClickEscape = () => {
        const random = Math.floor(Math.random() * 100);
        if(level < random) {
            router.push("/");
        }

    }
    return (
        <Center>
            <Button mr="3" onClick={onClickButtle}>戦う</Button>
            <Button mr="3" onClick={onClickCapture}>捕まえる</Button>
            <Button mr="3" onClick={onClickEscape}>逃げる</Button>
        </Center>
    )
}