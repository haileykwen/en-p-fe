import React from 'react';
import { useHistory } from 'react-router-dom';
import Phrase from '../Phrase';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
  } from "@chakra-ui/react"

const Main = () => {
    const [userData, setUserData] = React.useState(null);
    const [render, setRender] = React.useState(false);
    const history = useHistory();

    const onSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_data");
        history.replace("/signin");
    }

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user_data"));
        setUserData(user);
        if (user) {
            setRender(true);
        } else {
            history.replace("/signin");
        }
    }, []);

    return (
        render &&
        <div>
            <Menu>
                <MenuButton as={Button} mt="30px" ml="30px" >
                    { userData ? userData.full_name : "loading" }
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onSignOut}>Sign out</MenuItem>
                </MenuList>
            </Menu>
            <Phrase />
        </div>
    )
}

export default Main
