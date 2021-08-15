import React from 'react';
import { Center, Container, Text } from '@chakra-ui/react';
import { MyGap, ChakraInput, ChakraButton, ChakraLink, ChakraHeading, ChakraAlert } from '../../components';
import { useFormik } from "formik";
import axios from 'axios';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    const [info, setInfo] = React.useState({ show: false });
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    const SignupValidationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is a required field'),
        email: Yup.string().required('Email is a required field'),
        password: Yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters')
    });

    const onCreateAccount = (values) => {
        setLoading(true);
        axios.post("https://en-p.herokuapp.com/api/auth/signup", {
            full_name: values.fullName,
            email: values.email,
            password: values.password
        })
            .then((success) => {
                setLoading(false);
                formik.resetForm();
                setInfo({
                    show: true,
                    message: success.data.message,
                    status: success.status
                });
                console.log({success});
                setTimeout(() => {
                    history.replace("/signin");
                }, 2000);
            })
            .catch((error) => {
                const errorResponse = error.response; 
                setLoading(false);
                setInfo({
                    show: true,
                    message: errorResponse.data.message,
                    status: errorResponse.status
                });
                console.log({error});
            });
    }

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: ''
        },
        validationSchema: SignupValidationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: values => {
            onCreateAccount(values);
        },
    });

    return (
        <Center minH="100vh">
            <Container maxW="container.sm">
                <ChakraHeading text="Wellcome" />
                <MyGap height={10} />
                <ChakraLink normal="Sign up and start write your english study note!" />

                <MyGap height={40} />
                <ChakraAlert
                    show={info.show}
                    status={info.status}
                    message={info.message}
                    onClose={() => setInfo({...info, show: false})}
                />

                <MyGap height={20} />
                <form onSubmit={formik.handleSubmit}>
                    <ChakraInput 
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Full Name" 
                        placeholder="Sofia Vergara" 
                    />
                    <MyGap height={5} />
                    { formik.touched.fullName && formik.errors.fullName ? (
                        <Text fontSize="13px" color="red">{formik.errors.fullName}</Text>
                    ) : null }

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
                    <ChakraButton loading={loading} type="submit" label="Create Account" />
                </form>


                <MyGap height={20} />
                <ChakraLink 
                    normal="Have an account?" 
                    highlight="Sign in" 
                    onClick={() => history.push("/signin")}
                />
            </Container>
        </Center>
    )
}

export default SignUp
