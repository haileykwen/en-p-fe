import React from 'react';
import {
    Container,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useDisclosure,
    RadioGroup,
    Stack,
    Radio,
    useToast,
    Skeleton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import { ChakraButton, ChakraHeading, ChakraInput, ChakraText, MyGap } from '../../components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Phrase = () => {
    const [phrases, setPhrases] = React.useState(null);
    const [exampleType, setExampleType] = React.useState("");
    const [example, setExample] = React.useState("");
    const [meaning, setMeaning] = React.useState("");
    const [description, setDescription] = React.useState("");
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
    const [modalTitle, setModalTitle] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const history = useHistory();

    React.useEffect(() => {
        getPhrases();
    }, [])

    const getPhrases = () => {
        const userData = JSON.parse(localStorage.getItem("user_data"));
        // console.log({userData});
        axios.post("https://en-p.herokuapp.com/api/phrase/myphrases", {creator: userData.user_id})
            .then((success) => {
                setPhrases(success.data);
            })
            .catch((error) => {
                console.log({error});
                setPhrases([]);
            })
    }

    const onShowModalCreate = () => {
        setModalTitle("Create new phrase");
        onOpen();
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
        const userData = JSON.parse(localStorage.getItem("user_data"));
        let exampleData;
        if (exampleType === "statement") {
            exampleData = JSON.stringify(statement);
        } else {
            exampleData = JSON.stringify(conversation);
        }
        axios.post("https://en-p.herokuapp.com/api/phrase/create",{
            creator: userData.user_id,
            phrase: example,
            meaning,
            description,
            example_type: exampleType,
            example: exampleData
        })
            .then(() => {
                setLoading(false);
                onClose();
                toast({
                    title: "Phrase created.",
                    description: "We've created your phrase for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
                getPhrases();
            })
            .catch(() => {
                setLoading(false);
                onClose();
                toast({
                    title: "Error create phrase.",
                    description: "We are sorry, your phrase creating is failed. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
            })
    }

    const onViewPhrase = (data) => {
        history.push(`/phrase-detail/${data.phrase_id}`);
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
                onClick={onShowModalCreate}
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
                        <Tr key={index} cursor="pointer" onClick={() => onViewPhrase(phrase)}>
                            <Td width="1">{index + 1}</Td>
                            <Td>{phrase.phrase}</Td>
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

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ChakraText 
                            text="Phrase"
                            fontWeight="bold"
                        />
                        <ChakraInput
                            placeholder="Phrase title" 
                            value={example}
                            onChange={(e) => setExample(e.target.value)}   
                        />
                        <ChakraInput
                            placeholder="Meaning"
                            value={meaning}
                            onChange={(e) => setMeaning(e.target.value)}
                        />
                        <ChakraInput
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

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

                        {exampleType === "statement" && statement.map((item, index) => (
                            <React.Fragment key={index}>
                                <MyGap height={30} />
                                <ChakraText 
                                    text={`Example ${index + 1}`}
                                    fontWeight="bold"
                                />
                                <ChakraInput
                                    value={item.example}
                                    placeholder="Example"
                                    onChange={(e) => setStatement([...statement], statement[index].example = e.target.value)}  
                                />
                                <ChakraInput
                                    value={item.meaning}
                                    placeholder="Meaning"
                                    onChange={(e) => setStatement([...statement], statement[index].meaning = e.target.value)} 
                                />
                                <ChakraInput
                                    value={item.description}
                                    placeholder="Description"
                                    onChange={(e) => setStatement([...statement], statement[index].description = e.target.value)} 
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

                        {exampleType === "conversation" && conversation.map((item, index) => (
                            <React.Fragment key={index}>
                                <MyGap height={30} />
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
                                            onChange={(e) => setConversation([...conversation], conversation[index][indexChat].example = e.target.value)}    
                                        />
                                        <ChakraInput
                                            placeholder="Meaning"
                                            value={chat.meaning}
                                            onChange={(e) => setConversation([...conversation], conversation[index][indexChat].meaning = e.target.value)}
                                        />
                                        <ChakraInput
                                            placeholder="Description"
                                            value={chat.description}
                                            onChange={(e) => setConversation([...conversation], conversation[index][indexChat].description = e.target.value)}
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
                    </ModalBody>

                    <ModalFooter>
                        {exampleType === "statement" && 
                        <ChakraButton
                            label="Add new example"
                            backgroundColor="#32B056"
                            onClick={addNewExampleStatement}
                        />}

                        {exampleType === "conversation" && 
                        <ChakraButton
                            label="Add new example"
                            backgroundColor="#32B056"
                            onClick={addNewExampleConversation}
                        />}

                        <MyGap width={10} />
                        <ChakraButton
                            label="Save"
                            onClick={onSave}
                            loading={loading}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default Phrase
