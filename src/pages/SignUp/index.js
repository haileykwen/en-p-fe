import React from 'react';
import { Center, Container, Text } from '@chakra-ui/react';
import { MyGap, ChakraInput, ChakraButton, ChakraLink, ChakraHeading, ChakraAlert } from '../../components';
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import { URL } from '../../contants/Url';
import { post_signup } from '../../actions/auth';
import { signupInitialValues, signupValidationSchema } from '../../contants/Validation';

const SignUp = () => {
    const [info, setInfo] = React.useState({ show: false });
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    const onCreateAccount = (values) => {
        setLoading(true);
        const data = {
            full_name: values.fullName,
            email: values.email,
            password: values.password
        }
        post_signup(
            data,
            (success) => {
                // console.log({success});
                setLoading(false);
                formik.resetForm();
                setInfo({
                    show: true,
                    message: success.data.message,
                    status: success.status
                });
                setTimeout(() => {
                    history.replace(`${URL.SIGNIN}`);
                }, 2000);
            },
            (error) => {
                // console.log({error});
                const errorResponse = error.response; 
                setLoading(false);
                setInfo({
                    show: true,
                    message: errorResponse.data.message,
                    status: errorResponse.status
                });
            }
        );
    }

    const formik = useFormik({
        initialValues: signupInitialValues,
        validationSchema: signupValidationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: (values) => {
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
                    onClick={() => history.push(`${URL.SIGNIN}`)}
                />
            </Container>
        </Center>
    )
}

export default SignUp
