import React from 'react';
import { Container } from '@chakra-ui/react';
import { ChakraInput } from '../../components';

const PhraseDetail = () => {
    return (
        <Container maxW="container.sm" minH="100vh" paddingY="30px">
            <ChakraInput
                placeholder="Phrase title" 
                // value={example}
                // onChange={(e) => setExample(e.target.value)}   
            />
            <ChakraInput
                placeholder="Meaning"
                // value={meaning}
                // onChange={(e) => setMeaning(e.target.value)}
            />
            <ChakraInput
                placeholder="Description"
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
            />
        </Container>
    )
}

export default PhraseDetail
