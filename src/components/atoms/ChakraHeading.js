import { Heading } from "@chakra-ui/react";

const ChakraHeading = ({ text, textAlign }) => {
    return (
        <Heading fontSize="30px" textAlign={textAlign ? textAlign : "center"}>
            {text}
        </Heading>
    )
}

export default ChakraHeading;