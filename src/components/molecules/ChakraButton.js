import { Button } from "@chakra-ui/react";
import { constant } from "../../services";

const ChakraButton = ({ label, loading }) => {
    return (
        <Button 
            type="submit" 
            width="full" 
            isLoading={loading} 
            variant="solid" 
            backgroundColor={constant.COLOR_PRIMARY} 
            color={constant.COLOR_LIGHT}
        >
            {label}
        </Button>
    )
}

export default ChakraButton
