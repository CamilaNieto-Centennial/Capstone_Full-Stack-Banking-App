import Head from 'next/head';
//import Image from 'next/image'
import Layout, {siteTitle} from '../components/layout';
import { Card, Table, BankForm} from '../components/context';
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

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className={classes.full_container}>
                <Paper className={classes.form_container} radius={0} p={30}>
                    <Title order={2} className={classes.title} ta="center" mt="md" mb={25}>
                        Welcome to Tranzzacto!
                    </Title>

                    <TextInput label="Name" placeholder="Your name" size="md" />
                    <TextInput label="Email address" placeholder="hello@gmail.com" mt="md" size="md" />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
                    {/*<Checkbox label="Keep me logged in" mt="xl" size="md" />*/}
                    <Button fullWidth mt="xl" size="md">
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
                            <GoogleButton mb={10}>Continue with Google</GoogleButton>
                            <FacebookButton>Continue with Facebook</FacebookButton>
                        </Container>
                    </MantineProvider>
                    <br />
                </Paper>
                <div className={classes.image_container}></div>
            </div>
        </Layout>
    );
}

{/*
function CreateAccount(props){
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
                    <div className="row subcontainer" id="subcontainer01">
                        <div className="col col-8 col-sm-7 col-md-6 col-lg-7 col-xl-6 my-auto mx-auto">
                            <Card
                                bgcolor="light"
                                txtcolor="black"
                                header="Create Account"
                                headercolor = "#ffffff"
                                headerBackground = "#1b2a41"
                                body={showP
                                    ? (
                                        <BankForm
                                            chooseStatusP={chooseStatusP} // Choose Error message
                                            statusP={statusP} // Error message to display
                                            name="name"
                                            email="email"
                                            password="password"
                                            buttonCreate="Create Account"
                                            chooseShowP={chooseShowP} //Change the 'showP'
                                        />
                                    )
                                    :(
                                        <BankForm
                                            message="Success"
                                            buttonAdd="Add another account"
                                            chooseShowP={chooseShowP}
                                        />
                                    )
                                }
                            >
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="container-right" id="container-right01"></div>
            </div>
        </Layout>
    )
}
*/}

/* Set the Global User Context to CreateAccount Component */
export default function CreateAccountWithContext(){
    return (
    <>
      <NavBar />
      <UserProvider>
        <CreateAccount />
      </UserProvider>
    </>
    )
}

