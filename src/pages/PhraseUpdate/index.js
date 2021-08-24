import React from 'react';
import { ChakraButton, ChakraText, MyGap } from '../../components';
import { useHistory, useParams } from 'react-router-dom';
import {
    Container,
    RadioGroup,
    Stack,
    Radio,
    useToast,
    Skeleton,
    Textarea,
  } from "@chakra-ui/react"
import { URL } from '../../contants/Url';
import { get_phrase, put_phrase } from '../../actions/phrase';

const PhraseUpdate = () => {
    const [phraseId, setPhraseId] = React.useState("");
    const [example, setExample] = React.useState(null);
    const [meaning, setMeaning] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [exampleType, setExampleType] = React.useState("");
    const [statement, setStatement] = React.useState([
        {
            example: "",
            meaning: "",
            description: ""
        }
    ]);
    const [conversation, setConversation] = React.useState([
        [
            {
                example: "",
                meaning: "",
                description: ""
            },
            {
                example: "",
                meaning: "",
                description: ""
            }
        ]
    ]);
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();
    const history = useHistory();
    const params = useParams();

    React.useEffect(() => {
        if (params.slug) getPhrase();
    }, []);

    const getPhrase = () => {
        const data = { phrase_id: params.slug }
        get_phrase(
            data,
            (success) => {
                // console.log({success});
                let resp = success.data[0];
                setPhraseId(resp.phrase_id);
                setExample(resp.phrase);
                setMeaning(resp.meaning);
                setDescription(resp.description);
                setExampleType(resp.example_type);
                if (resp.example_type === "statement") {
                    setStatement(JSON.parse(resp.example));
                } else {
                    setConversation(JSON.parse(resp.example));
                }
            },
            (error) => {
                console.log({error});
            }
        );
    }

    const addNewExampleStatement = () => {
        setStatement([...statement, {
            example: "",
            meaning: "",
            description: ""
        }]);
    }

    const addNewExampleConversation = () => {
        setConversation([...conversation,
            [
                {
                    example: "",
                    meaning: "",
                    description: ""
                },
                {
                    example: "",
                    meaning: "",
                    description: ""
                }
            ]
        ]);
    }

    const deleteExampleStatement = (index) => {
        let tempor = [];
        for (let i = 0; i < statement.length; i++) {
            if (i !== index) {
                tempor.push(statement[i]);
            }
        }
        setStatement(tempor);
    }

    const deleteChat = (index, indexChat) => {
        let tempor = [];
        conversation.map((item, itemIndex) => {
            if (itemIndex !== index) {
                tempor.push(item);
            } else {
                let temporChat = [];
                item.map((chat, chatIndex) => {
                    if (chatIndex !== indexChat) {
                        temporChat.push(chat);
                    }
                });
                tempor.push(temporChat);
            }
        });
        setConversation(tempor);
    }

    const addChat = (index) => {
        let tempor = [];
        conversation.map((item, itemIndex) => {
            if (itemIndex !== index) {
                tempor.push(item);
            } else {
                let temporChat = [];
                item.map((chat, chatIndex) => {
                    temporChat.push(chat);
                });
                temporChat.push({
                    example: "",
                    meaning: "",
                    description: ""
                });
                tempor.push(temporChat);
            }
        });
        setConversation(tempor);
    }

    const deleteExampleConversation = (index) => {
        let tempor = [];
        conversation.map((item, idx) => {
            if (idx !== index) {
                tempor.push(item);
            }
        });
        setConversation(tempor);
    }

    const onSave = () => {
        setLoading(true);
        let exampleData;
        if (exampleType === "statement") {
            exampleData = JSON.stringify(statement);
        } else {
            exampleData = JSON.stringify(conversation);
        }

        const data = {
            phrase_id: phraseId,
            phrase: example,
            meaning,
            description,
            example_type: exampleType,
            example: exampleData
        }
        put_phrase(
            data,
            () => {
                setLoading(false);
                toast({
                    title: "Phrase updated.",
                    description: "We've updated your phrase for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
                history.replace(`${URL.PHRASE}`);
            },
            () => {
                setLoading(false);
                toast({
                    title: "Error update phrase.",
                    description: "We are sorry, updating phrase is failed. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
            }
        );
    }

    return (
        <Container maxW="container.sm" minH="calc(100vh - 102px)" paddingY="10px">
            <ChakraText 
                text="Phrase"
                fontWeight="bold"
            />

            {example !== null ? 
            <Textarea
                placeholder="Phrase title" 
                value={example}
                onChange={(e) => setExample(e.target.value)}
                resize="none"
                size="sm" 
                marginTop="10px"   
            /> : <Skeleton marginTop="10px" height="20px" />}
            
            {meaning !== null ? 
            <Textarea
                placeholder="Meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                resize="none"
                size="sm" 
                marginTop="10px"
            /> : <Skeleton marginTop="10px" height="20px" />}

            {description !== null ? 
            <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                resize="none"
                size="sm" 
                marginTop="10px"
            /> : <Skeleton marginTop="10px" height="20px" />}
            
            {exampleType !== "" ? 
            <React.Fragment>
                <MyGap height={30} />
                <ChakraText 
                    text="Example Type"
                    fontWeight="bold"
                />
                <MyGap height={10} />
                <RadioGroup fontSize="13px" onChange={(value) => setExampleType(value)} value={exampleType}>
                    <Stack direction="column">
                        <Radio fontSize="13px" value="statement" onClick={() => setExampleType("statement")}>
                            <ChakraText 
                                text="Statement"
                            />
                        </Radio>
                        <Radio fontSize="13px" value="conversation" onClick={() => setExampleType("conversation")}>
                            <ChakraText 
                                text="Conversation"
                            />
                        </Radio>
                    </Stack>
                </RadioGroup>
            </React.Fragment> : <Skeleton marginTop="10px" height="20px" />}

            {exampleType && exampleType === "statement" && statement.map((item, index) => (
                <React.Fragment key={index}>
                    <MyGap height={30} />
                    <ChakraText 
                        text={`Example ${index + 1}`}
                        fontWeight="bold"
                    />
                    <Textarea
                        value={item.example}
                        placeholder="Example"
                        onChange={(e) => setStatement([...statement], statement[index].example = e.target.value)}
                        resize="none"
                        size="sm" 
                        marginTop="10px"  
                    />
                    <Textarea
                        value={item.meaning}
                        placeholder="Meaning"
                        onChange={(e) => setStatement([...statement], statement[index].meaning = e.target.value)}
                        resize="none"
                        size="sm" 
                        marginTop="10px"
                    />
                    <Textarea
                        value={item.description}
                        placeholder="Description"
                        onChange={(e) => setStatement([...statement], statement[index].description = e.target.value)}
                        resize="none"
                        size="sm" 
                        marginTop="10px"
                    />
                    <MyGap height={10} />
                    <ChakraButton
                        label={`Delete example ${index + 1}`}
                        width="max-content"
                        backgroundColor="#C82333"
                        onClick={() => deleteExampleStatement(index)}
                    />
                </React.Fragment>
            ))}

            {exampleType && exampleType === "conversation" && conversation.map((item, index) => (
                <React.Fragment key={index}>
                    <MyGap height={30} />
                    <ChakraText 
                        text={`Example ${index + 1}`}
                        fontWeight="bold"
                    />
                    {item.map((chat, indexChat) => (
                        <React.Fragment key={indexChat}>
                            <MyGap height={15} />
                            <Textarea
                                placeholder="Example"
                                value={chat.example}
                                onChange={(e) => setConversation([...conversation], conversation[index][indexChat].example = e.target.value)}   
                                resize="none"
                                size="sm" 
                                marginTop="10px" 
                            />
                            <Textarea
                                placeholder="Meaning"
                                value={chat.meaning}
                                onChange={(e) => setConversation([...conversation], conversation[index][indexChat].meaning = e.target.value)}
                                resize="none"
                                size="sm" 
                                marginTop="10px"
                            />
                            <Textarea
                                placeholder="Description"
                                value={chat.description}
                                onChange={(e) => setConversation([...conversation], conversation[index][indexChat].description = e.target.value)}
                                resize="none"
                                size="sm" 
                                marginTop="10px"
                            />
                            <MyGap height={10} />
                            <ChakraButton
                                label={`Delete`}
                                width="max-content"
                                backgroundColor="#C82333"
                                onClick={() => deleteChat(index, indexChat)}
                            />
                        </React.Fragment>
                    ))}
                    <MyGap height={10} />
                    <Stack direction="row">
                        <ChakraButton
                            label={`Add chat to example ${index + 1}`}
                            width="max-content"
                            backgroundColor="#32B056"
                            onClick={() => addChat(index)}
                        />
                        <ChakraButton
                            label={`Delete example ${index + 1}`}
                            width="max-content"
                            backgroundColor="#C82333"
                            onClick={() => deleteExampleConversation(index)}
                        />
                    </Stack>
                </React.Fragment>
            ))}

            <MyGap height={20} />
            <Stack direction="row">
                {exampleType === "statement" && 
                <ChakraButton
                    label="Add new example"
                    backgroundColor="#32B056"
                    onClick={addNewExampleStatement}
                    width="max-content"
                />}

                {exampleType === "conversation" && 
                <ChakraButton
                    label="Add new example"
                    backgroundColor="#32B056"
                    onClick={addNewExampleConversation}
                    width="max-content"
                />}

                {exampleType && 
                <ChakraButton
                    label="Update"
                    onClick={onSave}
                    loading={loading}
                    width="max-content"
                />}
            </Stack>
        </Container>
    )
}

export default PhraseUpdate
