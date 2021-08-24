import * as Yup from 'yup';

const signupValidationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is a required field'),
    email: Yup.string().required('Email is a required field'),
    password: Yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters')
});

const signInValidationSchema = Yup.object({
    email: Yup.string().required('Email is a required field'),
    password: Yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters')
});

const signupInitialValues = {
    fullName: '',
    email: '',
    password: ''
}

const signinInitialValues = {
    email: '',
    password: ''
}

const statementExampleInitialValue = [
    {
        example: "",
        meaning: "",
        description: ""
    }
]


const conversationExampleInitialValue = [
    [
        {
            example: "",
            meaning: "",
            description: ""
        },
        {
            example: "",
            meaning: "",
            description: ""
        }
    ]
]

export {
    signupValidationSchema,
    signInValidationSchema,
    signupInitialValues,
    signinInitialValues,
    statementExampleInitialValue,
    conversationExampleInitialValue
}