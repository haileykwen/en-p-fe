import { Input, Text } from '@chakra-ui/react';
import { constant } from '../../services';

const ChakraInput = ({ id, name, type, value, onChange, onBlur, label, placeholder }) => {
    return (
        <div>
            <Text fontSize="13px" fontWeight="bold" mb="10px">
                {label}
            </Text>
            <Input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                focusBorderColor={constant.COLOR_PRIMARY} 
                placeholder={placeholder} 
            />
        </div>
    )
}

export default ChakraInput
