import { Progress, Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function HpBar({name, sumDamage, level}) {
    const [hpColor, setHpColor] = useState("green");
    useEffect(() => {
        if (50 > sumDamage) {
            setHpColor("green");
        } else if(80 > sumDamage && 50 <= sumDamage) {
            setHpColor("yellow");
        } else {
            setHpColor("red");
        }
    })
    return (
        <Box m="0 auto" w="600px" borderWidth='1px' borderRadius='lg' bg="white" boxShadow="xl">
            <Text m="10px">Lv.{level}  {name}</Text>
            <Progress colorScheme={`${hpColor}`} m="10px" value={100 - sumDamage} />
        </Box>
    )
}