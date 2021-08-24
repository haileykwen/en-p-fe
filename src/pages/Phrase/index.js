import React from 'react';
import {
    Container,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Skeleton,
  } from "@chakra-ui/react"
import { ChakraButton, ChakraHeading, ChakraText, MyGap } from '../../components';
import { URL } from "../../contants/Url";
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import { get_myPhrases } from '../../actions/phrase';

const Phrase = () => {
    const [phrases, setPhrases] = React.useState(null);
    const history = useHistory();

    React.useEffect(() => {
        getPhrases();
    }, [])

    const getPhrases = () => {
        const userData = JSON.parse(localStorage.getItem("user_data"));
        const data = { creator: userData.user_id }
        get_myPhrases(
            data,
            (success) => setPhrases(success.data),
            () => setPhrases([])
        );
    }

    return (
        <Container maxW="container.sm" minH="calc(100vh - 102px)" paddingY="10px">
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
                onClick={() => history.push(`${URL.PHRASE_CREATE}`)}
            />

            <MyGap height={10} />
            <Table variant="striped" fontSize="13px">
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Phrase</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    { phrases !== null && phrases.length !== 0 && phrases.map((phrase, index) => (
                        <Tr key={index} cursor="pointer">
                            <Td width="1">
                                <RouterLink to={URL.PHRASE_DETAIL.replace(':slug', phrase.phrase_id)}>
                                    {index + 1}
                                </RouterLink>
                            </Td>
                            <Td>
                                <RouterLink to={URL.PHRASE_DETAIL.replace(':slug', phrase.phrase_id)}>
                                    {phrase.phrase}
                                </RouterLink>
                            </Td>
                        </Tr>
                    ))}

                    { phrases === null && (
                        <Tr>
                            <Td width="1"><Skeleton height="20px" /></Td>
                            <Td><Skeleton height="20px" /></Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </Container>
    )
}

export default Phrase
