import { Stack, Text } from "@chakra-ui/react";
import { constant } from "../../services";

const ChakraLink = ({ normal, highlight }) => {
    return (
        <Stack direction="row" justifyContent="center">
            <Text fontSize="13px" color={constant.COLOR_SECONDARY}>
                {normal}
            </Text>
            <Text fontSize="13px" color={constant.COLOR_PRIMARY} cursor="pointer">
                {highlight}
            </Text>
        </Stack>
    )
}

export default ChakraLink;