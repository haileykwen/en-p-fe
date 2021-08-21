import React from 'react';
import { Phrase, PhraseDetail } from "../";
import { BrowserRouter, Switch, useHistory } from "react-router-dom";
import { ChakraHeader, PrivateRoute } from "../../components";

const Main = () => {
    const [userData, setUserData] = React.useState(null);
    const [render, setRender] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user_data"));
        setUserData(user);
        if (user) {
            setRender(true);
        } else {
            history.replace("/signin");
        }
    }, []);

    const onSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_data");
        history.replace("/signin");
    }

    return (
        render &&
        <BrowserRouter>
            <ChakraHeader userData={userData} onSignOut={onSignOut} />
            <Switch>
                <PrivateRoute exact path="/" component={Phrase} />
                <PrivateRoute exact path="/phrase-detail/:data" component={PhraseDetail} />
            </Switch>
        </BrowserRouter>
    )
}

export default Main
