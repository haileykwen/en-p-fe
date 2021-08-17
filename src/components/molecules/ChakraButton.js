import { Button } from "@chakra-ui/react";
import { constant } from "../../services";

const ChakraButton = ({ label, loading, width, onClick, backgroundColor }) => {
    return (
        <Button 
            type="submit" 
            width={width ? width : "full"} 
            isLoading={loading} 
            variant="solid" 
            backgroundColor={backgroundColor ? backgroundColor : constant.COLOR_PRIMARY} 
            color={constant.COLOR_LIGHT}
            fontSize="13px"
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default ChakraButton
