import React from 'react';
import { Center, Container, Text } from '@chakra-ui/react';
import { ChakraAlert, ChakraButton, ChakraHeading, ChakraInput, ChakraLink, MyGap } from '../../components';
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    const [info, setInfo] = React.useState({ show: false });
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    const onSignin = (values) => {
        setLoading(true);
        axios.post("https://en-p.herokuapp.com/api/auth/signin", {
            email: values.email,
            password: values.password
        })
            .then((success) => {
                console.log({success});
                localStorage.setItem("jwt", success.data.token);
                localStorage.setItem("user_data", JSON.stringify(success.data.data));
                formik.resetForm();
                setLoading(false);
                history.replace("/");
            })
            .catch((error) => {
                const errorResponse = error.response; 
                setInfo({
                    show: true,
                    message: errorResponse.data.message,
                    status: errorResponse.status
                });
                console.log({error});
                setLoading(false);
            });
    }

    const signInValidationSchema = Yup.object({
        email: Yup.string().required('Email is a required field'),
        password: Yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: signInValidationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: values => {
            onSignin(values);
        },
    });

    return (
        <Center minH="100vh">
            <Container maxW="container.sm">
                <ChakraHeading text="Wellcome Back" />
                <MyGap height={10} />
                <ChakraLink normal="Sign in and let's continue!" />

                <MyGap height={40} />
                <ChakraAlert
                    show={info.show}
                    status={info.status}
                    message={info.message}
                    onClose={() => setInfo({...info, show: false})}
                />

                <MyGap height={20} />
                <form onSubmit={formik.handleSubmit}>
                    <MyGap height={15} />
                    <ChakraInput 
                        id="email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Email" 
                        placeholder="sofiavergara@mail.com" 
                    />
                    <MyGap height={5} />
                    { formik.touched.email && formik.errors.email ? (
                        <Text fontSize="13px" color="red">{formik.errors.email}</Text>
                    ) : null }

                    <MyGap height={15} />
                    <ChakraInput
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Password" 
                    />
                    <MyGap height={5} />
                    { formik.touched.password && formik.errors.password ? (
                        <Text fontSize="13px" color="red">{formik.errors.password}</Text>
                    ) : null }

                    <MyGap height={40} />
                    <ChakraButton loading={loading} type="submit" label="Next" />
                </form>

                <MyGap height={20} />
                <ChakraLink 
                    normal="Don't have an account?" 
                    highlight="Create account" 
                    onClick={() => history.push("/signup")}
                />
            </Container>
        </Center>
    )
}

export default SignIn
