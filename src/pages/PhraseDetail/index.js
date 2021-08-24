import React from 'react';
import { 
        Container, 
        Skeleton, 
        Stack, 
        Textarea ,
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalFooter,
        ModalBody,
        ModalCloseButton,
        useDisclosure,
        useToast,
    } from '@chakra-ui/react';
import { ChakraText, MyGap, ChakraButton } from '../../components';
import { useHistory, useParams, NavLink as RouterLink } from 'react-router-dom';
import { URL } from '../../contants/Url';
import { delete_phrase, get_phrase } from '../../actions/phrase';

const PhraseDetail = () => {
    const [phraseId, setPhraseId] = React.useState(null);
    const [phrase, setPhrase] = React.useState(null);
    const [meaning, setMeaning] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [exampleType, setExampleType] = React.useState(null);
    const [example, setExample] = React.useState(null);
    const [loadingDelete, setLoadingDelete] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const params = useParams();
    const toast = useToast();
    const history = useHistory();

    React.useEffect(() => {
        // console.log(params);
        getPhrase(params.slug);
    }, []);

    const getPhrase = (id) => {
        get_phrase(
            id,
            (success) => {
                // console.log({success});
                let resp = success.data[0];
                setPhraseId(resp.phrase_id);
                setPhrase(resp.phrase);
                setMeaning(resp.meaning);
                setDescription(resp.description);
                setExampleType(resp.example_type);
                setExample(JSON.parse(resp.example));
            },
            (error) => {
                console.log({error});
            }
        );
    }

    const onDelete = () => {
        setLoadingDelete(true);
        delete_phrase(
            phraseId,
            () => {
                setLoadingDelete(false);
                onClose();
                toast({
                    title: "Phrase deleted.",
                    description: "We've deleted your phrase for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
                history.replace(`${URL.PHRASE}`);
            },
            () => {
                setLoadingDelete(false);
                onClose();
                toast({
                    title: "Deleting phrase failed.",
                    description: "We are sorry for something wrong. Please try again later.",
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
                            <Textarea
                                placeholder="Example"
                                value={chat.example}  
                                readOnly
                                resize="none"
                                size="sm"
                            />
                            <MyGap height={5} />
                            <Textarea
                                placeholder="Meaning"
                                value={chat.meaning}
                                readOnly
                                resize="none"
                                size="sm"
                            />
                            <MyGap height={5} />
                            <Textarea
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

            {example && <MyGap height={20} />}

            {example && 
            <Stack direction="row">
                <RouterLink to={URL.PHRASE_UPDATE.replace(':slug', params.slug)}>
                    <ChakraButton 
                        label="Update" 
                        width="max-content"
                        backgroundColor="#FBBD08"
                    />
                </RouterLink>
                <ChakraButton 
                    label="Delete" 
                    width="max-content"
                    backgroundColor="#C82333" 
                    onClick={onOpen}
                />
            </Stack>
            }

            <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ChakraText text="Are you sure want to delete this phrase?" />
                    </ModalBody>

                    <ModalFooter>
                        <ChakraButton 
                            label="Delete" 
                            width="max-content"
                            backgroundColor="#C82333"
                            onClick={onDelete}
                            loading={loadingDelete}
                        />
                        <MyGap width={10} />
                        <ChakraButton 
                            label="Cancel" 
                            width="max-content"
                            backgroundColor="#FBBD08"
                            onClick={onClose}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default PhraseDetail
