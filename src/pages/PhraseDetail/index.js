import React from 'react';
import { Container, Skeleton, Textarea } from '@chakra-ui/react';
import { ChakraInput, ChakraText, MyGap } from '../../components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PhraseDetail = () => {
    const [phraseId, setPhraseId] = React.useState(null);
    const [phrase, setPhrase] = React.useState(null);
    const [meaning, setMeaning] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [exampleType, setExampleType] = React.useState(null);
    const [example, setExample] = React.useState(null);
    const params = useParams();

    React.useEffect(() => {
        // console.log(params);
        getPhrase(params.data);
    }, []);

    const getPhrase = (id) => {
        axios.post("https://en-p.herokuapp.com/api/phrase/view", {phrase_id: id})
            .then((success) => {
                // console.log({success});
                let resp = success.data[0];
                setPhraseId(resp.phrase_id);
                setPhrase(resp.phrase);
                setMeaning(resp.meaning);
                setDescription(resp.description);
                setExampleType(resp.example_type);
                setExample(JSON.parse(resp.example));
            })
            .catch((error) => {
                console.log({error});
            });
    }

    return (
        <Container maxW="container.sm" minH="calc(100vh - 102px)" paddingY="10px">
            <ChakraText text="Phrase" fontWeight="bold" />
            {phrase !== null ? 
            <Textarea
                placeholder="Phrase title"
                value={phrase}
                readOnly
                resize="none"
                size="sm"
            /> : <Skeleton height="20px" />}
            <MyGap height={20} />

            <ChakraText text="Meaning" fontWeight="bold" />
            {meaning !== null ? 
            <Textarea
                placeholder="meaning"
                value={meaning}
                readOnly
                resize="none"
                size="sm"
            /> : <Skeleton height="20px" />}
            <MyGap height={20} />

            <ChakraText text="Description" fontWeight="bold" />
            {description !== null ? 
            <Textarea
                placeholder="description"
                value={description}
                readOnly
                resize="none"
                size="sm"
            /> : <Skeleton height="20px" />}
            <MyGap height={20} />

            <ChakraText text="Example" fontWeight="bold" />
            <MyGap height={10} />

            {example === null && exampleType === null && <Skeleton height="20px" />}

            {exampleType && exampleType === "statement" && example && example.map((item, index) => (
                <React.Fragment key={index}>
                    <ChakraText 
                        text={`Example ${index + 1}`}
                        fontWeight="bold"
                    />
                    <Textarea
                        placeholder="Example"
                        value={item.example}
                        readOnly
                        resize="none"
                        size="sm" 
                    />
                    <MyGap height={5} />
                    <Textarea
                        placeholder="Meaning"
                        value={item.meaning}
                        readOnly
                        resize="none"
                        size="sm"
                    />
                    <MyGap height={5} />
                    <Textarea
                        placeholder="Description"
                        value={item.description}
                        readOnly
                        resize="none"
                        size="sm"
                    />
                </React.Fragment>
            ))}

            {exampleType && exampleType === "conversation" && example && example.map((item, index) => (
                <React.Fragment key={index}>
                    <ChakraText 
                        text={`Example ${index + 1}`}
                        fontWeight="bold"
                    />
                    {item.map((chat, indexChat) => (
                        <React.Fragment key={indexChat}>
                            <MyGap height={15} />
                            <ChakraInput
                                placeholder="Example"
                                value={chat.example}  
                                readOnly
                                resize="none"
                                size="sm"
                            />
                            <ChakraInput
                                placeholder="Meaning"
                                value={chat.meaning}
                                readOnly
                                resize="none"
                                size="sm"
                            />
                            <ChakraInput
                                placeholder="Description"
                                value={chat.description}
                                readOnly
                                resize="none"
                                size="sm"
                            />
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </Container>
    )
}

export default PhraseDetail
