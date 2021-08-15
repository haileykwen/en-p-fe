import { Button } from "@chakra-ui/react";
import { constant } from "../../services";

const ChakraButton = ({ label, loading, width }) => {
    return (
        <Button 
            type="submit" 
            width={width ? width : "full"} 
            isLoading={loading} 
            variant="solid" 
            backgroundColor={constant.COLOR_PRIMARY} 
            color={constant.COLOR_LIGHT}
            fontSize="13px"
        >
            {label}
        </Button>
    )
}

export default ChakraButton
