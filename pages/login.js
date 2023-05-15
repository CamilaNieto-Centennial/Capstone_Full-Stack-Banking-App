import Head from 'next/head';
//import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout';
import { UserContext, UserProvider } from '../components/userContext';
import NavBar from '../components/navbar';
import React, { useState, useEffect } from 'react';
import { auth } from '../lib/initAuth';
import { useRouter } from 'next/router';

import {
    Title,
    Text,
    Anchor,
    rem,
    createStyles,
    Paper,
    Button,
    MantineProvider,
    Container,
    TextInput,
    PasswordInput,
    Checkbox,
    useMantineTheme,
} from '@mantine/core';
import { notifications, Notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import { Google } from 'grommet-icons';
import { Facebook } from 'grommet-icons';


const useStyles = createStyles((theme) => ({
    full_container: {
        height: `calc(100vh - 60px)`,
        position: 'relative',
    },

    form_container: {
        width: '50%',
        height: '100%',
        float: 'left',
        position: 'relative',
        marginTop: '0em',
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
            marginBottom: '2em',
        },
    },

    image_container: {
        width: '50%',
        height: '100%',
        float: 'left',
        background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("/images/form1.jpg") center/cover no-repeat',

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
            marginBottom: '14px',
            marginTop: '14px',
        },
    },
}));

export function GoogleButton(props) {
    return <Button leftIcon={<Google color='plain' />} fullWidth="true" variant="default" color="gray" {...props} />;
}

export function FacebookButton(props) {
    return (
        <Button
            fullWidth="true"
            leftIcon={<Facebook color='plain' />}
            variant="default" color="gray"
            {...props}
        />
    );
}

export function Login() {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');
    const [color, setColor] = useState('');
    const [icon, setIcon] = useState('');
    const [close, setClose] = useState('');

    const validateEmail = (email) => {
        // Regular expression for email validation
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email.trim() === '') {
            setTitle("")
            setMsg('Please enter your email');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }
    
        if (!validateEmail(email)) {
            setTitle("")
            setMsg('Please enter a valid email address');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }
    
        if (password.trim() === '') {
            setTitle("")
            setMsg('Please enter your password');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }
    
        if (password.length < 8) {
            setTitle("")
            setMsg('Password should be at least 8 characters long');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }

        try {
            // Sign in the user with email and password
            await auth.signInWithEmailAndPassword(email, password);
            // Wait for 4 seconds before redirecting to the Home Page
            setTimeout(() => {
                router.push('/');
            }, 4000);
            setTitle("You did great")
            setMsg("Successful Login");
            setColor("green");
            setIcon(<IconCheck />);
            setClose(4000);
        } catch (error) {
            console.log(error.message);
            const errorMessage = error.message;
            // Define a regular expression pattern to match the desired portion of the error message
            const pattern = /Firebase: (.*?)(\s*\(.+\))?$/;
            // Use the match() method with the pattern to extract the desired portion
            const matches = pattern.exec(errorMessage);
            const extractedMessage = matches[1];

            setTitle("Oops!")
            setMsg(extractedMessage);
            setColor("red");
            setIcon(<IconX />);
            setClose(9000);
        }
    };

    useEffect(() => {
        if (msg) {
            notifications.show({ title: title, message: msg, color: color, icon: icon, autoClose: close });
        }
    }, [msg]);

    return (
        <Layout>
            <MantineProvider withNormalizeCSS withGlobalStyles>
                <Notifications />
            </MantineProvider>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className={classes.full_container}>
                <Paper className={classes.form_container} radius={0} p={30}>
                    <Title order={2} className={classes.title} ta="center" mt="md" mb={25}>
                        Welcome back to Tranzzacto!
                    </Title>

                    <TextInput label="Email address" placeholder="hello@gmail.com" size="md" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/*<Checkbox label="Keep me logged in" mt="xl" size="md" />*/}
                    <Button fullWidth mt="xl" size="md" onClick={handleLogin}>
                        Login
                    </Button>

                    <Text ta="center" mt="md">
                        Don&apos;t have an account?{' '}
                        <Anchor href="/createaccount" weight={700}>
                            Register
                        </Anchor>
                    </Text>
                    <Title order={4} className={classes.title} ta="center" mt="md" mb={20}>
                        OR
                    </Title>
                    <MantineProvider
                        theme={{
                            components: {
                                Container: {
                                    defaultProps: {
                                        sizes: {
                                            xs: 380
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        <Container size="xs">
                            <GoogleButton mb={10}>Continue with Google</GoogleButton>
                            {/*<FacebookButton>Continue with Facebook</FacebookButton>*/}
                        </Container>
                    </MantineProvider>
                    <br />
                </Paper>
                <div className={classes.image_container}></div>
            </div>
        </Layout>
    );
}

/* Set the Global User Context to Login Component */
export default function LoginWithContext() {
    return (
        <>
            <NavBar />
            <UserProvider>
                <Login />
            </UserProvider>
        </>
    )
}