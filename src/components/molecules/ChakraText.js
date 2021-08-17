import React from 'react';
import { Text } from '@chakra-ui/react';

const ChakraText = ({ text, fontWeight }) => {
    return (
        <Text fontSize="13px" fontWeight={fontWeight ? fontWeight : "normal"}>
            {text}
        </Text>
    )
}

export default ChakraText
