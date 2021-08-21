import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Container
  } from "@chakra-ui/react";

const ChakraHeader = ({userData, onSignOut}) => {

    return (
        <Container maxW="full" padding="4">
            <Menu>
                <MenuButton as={Button}>
                    { userData ? userData.full_name : "loading" }
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onSignOut}>Sign out</MenuItem>
                </MenuList>
            </Menu>
        </Container>
    )
}

export default ChakraHeader
