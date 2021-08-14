import { Alert, AlertDescription, AlertIcon, CloseButton } from "@chakra-ui/react";
import React from "react";

const ChakraAlert = ({ show, status, message, onClose }) => {
    return (
        show && 
        <Alert status={status === 200 ? "success" : "error"}>
            <AlertIcon />
            <AlertDescription fontSize="13px">{message ? message : "Server error!"}</AlertDescription>
            <CloseButton 
                position="absolute" 
                right="8px" top="8px" 
                onClick={onClose}
            />
        </Alert>
    )
}

export default ChakraAlert;