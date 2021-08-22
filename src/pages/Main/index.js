import React from 'react';
import { Phrase, PhraseDetail } from "../";
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { ChakraHeader, PrivateRoute } from "../../components";
import PhraseCreate from '../PhraseCreate';
import PhraseUpdate from '../PhraseUpdate';
import { URL } from "../../contants/Url";

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
            history.replace(`${URL.SIGNIN}`);
        }
    }, []);

    const onSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_data");
        history.replace(`${URL.SIGNIN}`);
    }

    return (
        render &&
        <BrowserRouter>
            <ChakraHeader userData={userData} onSignOut={onSignOut} />
            <Switch>
                <Route path="/" render={() => <Redirect to={URL.MAIN} />} exact />
                <PrivateRoute exact path={URL.MAIN} component={Phrase} />
                <PrivateRoute exact path={URL.PHRASE_DETAIL} component={PhraseDetail} />
                <PrivateRoute exact path={URL.PHRASE_CREATE} component={PhraseCreate} />
                <PrivateRoute exact path={URL.PHRASE_UPDATE} component={PhraseUpdate} />
            </Switch>
        </BrowserRouter>
    )
}

export default Main
