import React from 'react';
import {
    Container,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from "@chakra-ui/react"
import { ChakraButton, ChakraHeading, ChakraText, MyGap } from '../../components';

const Phrase = () => {
    return (
        <Container maxW="container.sm" minH="100vh" paddingY="30px">
            <ChakraHeading text="Phrases" textAlign="left" />
            <MyGap height={10} />
            <ChakraText
                text="A phrase is a group of words that stand together as a single grammatical unit, typically as part of a clause or a sentence."
            />
            <MyGap height={10} />
            <ChakraText
                text="A phrase does not contain a subject and verb and, consequently, cannot convey a complete thought. A phrase contrasts with a clause. A clause does contain a subject and verb, and it can convey a complete idea."
            />
            <MyGap height={20} />
            <ChakraButton
                label="Create New Phrase"
                width="max-content"
            />

            <MyGap height={10} />
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Phrase</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Container>
    )
}

export default Phrase
