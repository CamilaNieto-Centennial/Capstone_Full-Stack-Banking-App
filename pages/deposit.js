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
    Group,
    PaperProps,
    Stack,
    TextInput,
    PasswordInput,
    Checkbox,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    full_container: {
        height: `calc(100vh - 60px)`,
        position: 'relative',
        background: 'linear-gradient(20deg, teal, green)',
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
        background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("/images/deposit.jpg") center/cover no-repeat',
        
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
      },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));


export function Deposit() {
    const { classes } = useStyles();

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className={classes.full_container}>
            <Paper className={classes.form_container} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center"  mb="xs">Deposit</Title>
                
                <Title order={3} className={classes.title} mb="0">Guest</Title>
                <Text mt=".2rem" weight={500}>Balance <Text span fw={700}>$ 0</Text></Text>
                <TextInput label="Deposit Amount" placeholder="$$$" size="md" mt=".8rem" />
                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Deposit
                </Button>
            </Paper>
            <div className={classes.image_container}></div>
            </div>
        </Layout>
    );
}

{/*function Deposit(){
    const ctx = React.useContext(UserContext)
    let current_user = ctx.current_user;

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
                    <div className="row subcontainer" id="subcontainer03">
                        <div className="col col-8 col-sm-7 col-md-6 col-lg-7 col-xl-6 my-auto mx-auto">
                            <Card
                                bgcolor="light"
                                txtcolor="black"
                                header="Deposit"
                                headercolor = "#ffffff"
                                headerBackground = "#3a5a40"
                                title={`${current_user[0]}`}
                                body={showP
                                    ? (
                                        <BankForm
                                            chooseStatusP={chooseStatusP}
                                            statusP={statusP}
                                            balance={`$ ${current_user[1]}`}
                                            deposit="deposit"
                                            buttonDeposit="Deposit"
                                            chooseShowP={chooseShowP}
                                        />
                                    )
                                    :(
                                        <BankForm
                                            message="Successfully Deposit"
                                            buttonAddD="Add another Deposit"
                                            chooseShowP={chooseShowP}
                                        />
                                    )
                                }
                            >
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="container-right" id="container-right03"></div>
            </div>
        </Layout>
    )
}
*/}

/* Set the Global User Context to Deposit Component */
export default function DepositWithContext(){
    return (
    <>
      <NavBar />
      <UserProvider>
        <Deposit />
      </UserProvider>
    </>
    )
}