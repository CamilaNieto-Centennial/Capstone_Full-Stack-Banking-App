import Head from 'next/head';
//import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout';
import { Card, Table, BankForm } from '../components/context';
import { UserContext, UserProvider } from '../components/userContext';
import NavBar from '../components/navbar';
import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../lib/initAuth';

import {
    Title,
    Text,
    Anchor,
    rem,
    createStyles,
    Paper,
    Button,
    TextInput,
    MantineProvider,
} from '@mantine/core';
import { notifications, Notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

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

    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [balance, setBalance] = useState(0);
    const [id, setId] = useState('');
    const [depositAmount, setDepositAmount] = useState(''); // New state for the deposit amount
    const { userEmail } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');
    const [color, setColor] = useState('');
    const [icon, setIcon] = useState('');
    const [close, setClose] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in
                setUser(authUser);
            } else {
                // User is signed out
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('User Email: ' + userEmail);
                if (userEmail) { // Only fetch data if userEmail is not empty
                    const response = await fetch(
                        `/api/get-user-by-email?email=${userEmail}`
                    );
                    if (response.ok) {
                        const user = await response.json();
                        setUserName(user.name);
                        setBalance(user.balance);
                        setId(user._id);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [userEmail]);


    const handleDeposit = async () => {

        if (depositAmount.trim() === '') {
            setMsg('Please enter your deposit amount');
            setColor('red');
            setIcon(<IconX />);
            setClose(4000);
            return;
        }

        const parsedAmount = Number(depositAmount);

        if (isNaN(parsedAmount)) {
            setMsg('Deposit must be a number');
            setColor('red');
            setIcon(<IconX />);
            setClose(4000);
            return;
        }

        if (parsedAmount <= 0) {
            setMsg('Deposit must be positive');
            setColor('red');
            setIcon(<IconX />);
            setClose(4000);
            return;
        }

        try {
            // Calculate the new balance
            const updatedBalance = (Number(balance) - parsedAmount).toFixed(2);

            const response = await fetch(`/api/update-user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    balance: updatedBalance,
                }),
            });

            if (response.ok) {
                setMsg("Successful Deposit");
                setColor("green");
                setIcon(<IconCheck />);
                setClose(3000);
                // Update the local state with the new balance
                setBalance(updatedBalance);
            } else {
                console.error('Error updating user:', response.status);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            const errorMessage = error.message;
            setTitle("Oops!");
            setMsg(errorMessage);
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
            {user ? (
                <div className={classes.full_container}>
                    <Paper className={classes.form_container} radius={0} p={30}>
                        <Title order={2} className={classes.title} ta="center" mb="xs">Deposit</Title>

                        <Title order={3} className={classes.title} mb="0">{userName || 'Guest'}</Title>
                        <Text mt=".2rem" weight={500}>Balance <Text span fw={700}>$ {balance !== null ? balance : '-'}</Text></Text>
                        <TextInput label="Deposit Amount" placeholder="$$$" size="md" mt=".8rem" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                        <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={handleDeposit}>
                            Deposit
                        </Button>
                        <br />
                    </Paper>
                    <div className={classes.image_container}></div>
                </div>
            ) : (
                <div className={classes.full_container}>
                    <Paper className={classes.form_container} radius={0} p={30}>
                        <Title order={2} className={classes.title} ta="center" mb="xs">Deposit</Title>

                        <Text fw={700} ta="center" mt="xs">
                            Please {' '}
                            <Anchor href="/createaccount" weight={700}>
                                register {' '}
                            </Anchor>
                            or {' '}
                            <Anchor href="/login" weight={700}>
                                login {' '}
                            </Anchor>
                            to get access to the content.
                        </Text>
                        <br />
                    </Paper>
                    <div className={classes.image_container}></div>
                </div>
            )}
        </Layout>
    );
}

/* Set the Global User Context to Deposit Component */
export default function DepositWithContext() {
    return (
        <UserProvider>
            <NavBar />
            <Deposit />
        </UserProvider>
    )
}