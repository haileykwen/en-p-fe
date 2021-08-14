import { Heading } from "@chakra-ui/react";

const ChakraHeading = ({ text }) => {
    return (
        <Heading fontSize="30px" textAlign="center">
            {text}
        </Heading>
    )
}

export default ChakraHeading;