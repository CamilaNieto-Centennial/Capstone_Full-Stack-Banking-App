import Head from 'next/head';
//import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout';
import { Card, Table, BankForm } from '../components/context';
import { UserContext, UserProvider } from '../components/userContext';
import NavBar from '../components/navbar';
import React from 'react'

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
} from '@mantine/core';

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
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
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

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className={classes.full_container}>
                <Paper className={classes.form_container} radius={0} p={30}>
                    <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                        Welcome back to Mantine!
                    </Title>

                    <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
                    {/*<Checkbox label="Keep me logged in" mt="xl" size="md" />*/}
                    <Button fullWidth mt="xl" size="md">
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
                            <FacebookButton>Continue with Facebook</FacebookButton>
                        </Container>
                    </MantineProvider>
                </Paper>
                <div className={classes.image_container}></div>
            </div>
        </Layout>
    );
}

{/*
function Login(){
    const ctx = React.useContext(UserContext)
    let current_user = Object.values(ctx.current_user);
    const [showP, setShowP] = React.useState(true);
    const [statusP, setStatusP] = React.useState('');

    const chooseShowP = (showP) => {
        setShowP(showP);
    };
    const chooseStatusP = (statusP) => {
        setStatusP(statusP);
    };

    return(
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="container-big">
                <div className="container-left">
                    <div className="row subcontainer" id="subcontainer02">
                        <div className="col col-8 col-sm-7 col-md-6 col-lg-7 col-xl-6 my-auto mx-auto">
                            <Card
                                bgcolor="light"
                                txtcolor="black"
                                header="Login"
                                headercolor = "#ffffff"
                                headerBackground = "#6c584c"
                                body={showP
                                    ? (
                                        <BankForm
                                            chooseStatusP={chooseStatusP}
                                            statusP={statusP}
                                            email="email"
                                            password="password"
                                            buttonLogin="Login"
                                            chooseShowP={chooseShowP}
                                        />
                                    )
                                    :(
                                        <BankForm
                                            message={`Successfully Login as ${current_user[0]}`}
                                            chooseShowP={chooseShowP}
                                        />
                                    )
                                }
                            >
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="container-right" id="container-right02"></div>
            </div>
        </Layout>
    )
}
*/}

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