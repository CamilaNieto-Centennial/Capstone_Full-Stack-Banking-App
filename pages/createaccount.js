import Head from 'next/head';
//import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout';
import { UserContext, UserProvider } from '../components/userContext';
import NavBar from '../components/navbar';
import React, { useState, useEffect } from 'react';
import { auth } from '../lib/initAuth';
import { useRouter } from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
        height: `calc(100vh - 40px)`,
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
        background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("/images/form.jpg") center/cover no-repeat',

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

export function CreateAccount() {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState(0);
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

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            setMsg('Please enter your name');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }

        if (email.trim() === '') {
            setMsg('Please enter your email');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }

        if (!validateEmail(email)) {
            setMsg('Please enter a valid email address');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }

        if (password.trim() === '') {
            setMsg('Please enter your password');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }

        if (password.length < 8) {
            setMsg('Password should be at least 8 characters long');
            setColor('red');
            setIcon(<IconX />);
            setClose(3000);
            return;
        }

        try {
            // Create the user with email and password
            await auth.createUserWithEmailAndPassword(email, password)
                .then(async (userCredential) => {
                    // Save the user's name to Firebase Authentication
                    userCredential.user.updateProfile({
                        displayName: name,
                    }).then(() => {
                        console.log("User's name saved successfully!");
                        router.push('/');
                    }).catch((error) => {
                        console.error("Error saving user's name: ", error);
                    });

                    // Make a POST request to create a new user in the database
                    const response = await fetch('/api/create-user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            password,
                            balance
                        }),
                    });

                    if (response.ok) {
                        // Wait for 3 seconds before redirecting to the Home Page
                        setTimeout(() => {
                            router.push('/');
                        }, 3000);
                        setTitle("You did great")
                        setMsg("Successful Sign Up");
                        setColor("green");
                        setIcon(<IconCheck />);
                        setClose(3000);
                    } else {
                        throw new Error('Failed to create user');
                    }
                })
                .catch((error) => {
                    //console.error("Error creating user: ", error);
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
                });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);

            const { displayName, email } = result.user;

            // Make a POST request to create a new user in the database
            const response = await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: displayName,
                    email: email,
                    password,
                    balance
                }),
            });

            if (response.ok) {
                // Wait for 3 seconds before redirecting to the Home Page
                setTimeout(() => {
                    router.push('/');
                }, 3000);
                setTitle('You did great');
                setMsg('Successful Sign Up');
                setColor('green');
                setIcon(<IconCheck />);
                setClose(3000);
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.log(error.message);
            const errorMessage = error.message;
            setTitle('Oops!');
            setMsg(errorMessage);
            setColor('red');
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
                        Welcome to Tranzzacto!
                    </Title>

                    <TextInput label="Name" placeholder="Your name" size="md" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextInput label="Email address" placeholder="hello@gmail.com" mt="md" size="md" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/*<Checkbox label="Keep me logged in" mt="xl" size="md" />*/}
                    <Button fullWidth mt="xl" size="md" onClick={handleSignUp}>
                        Sign Up
                    </Button>

                    <Text ta="center" mt="md">
                        Have an account?{' '}
                        <Anchor href="/login" weight={700}>
                            Login
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
                            <GoogleButton mb={10} onClick={handleGoogleSignIn}>Continue with Google</GoogleButton>
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

/* Set the Global User Context to CreateAccount Component */
export default function CreateAccountWithContext() {
    return (
        <UserProvider>
            <NavBar />
            <CreateAccount />
        </UserProvider>
    )
}

