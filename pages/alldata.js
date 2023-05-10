import Head from 'next/head';
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout';
import { BankForm } from '../components/context'; // Table
import { UserContext, UserProvider } from '../components/userContext';
import NavBar from '../components/navbar';
import React from 'react'
import { useState } from 'react';

import { User } from 'grommet-icons';

import {
    Title,
    Text,
    Anchor,
    rem,
    createStyles,
    Container,
    Group,
    Center,
    Card,
    Avatar,
    Table,
    ScrollArea,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    full_container: {
        height: `calc(100vh - 60px)`,
        position: 'relative',
    },

    card_container: {
        marginTop: '2rem',

        [theme.fn.smallerThan('sm')]: {
            marginTop: '1rem'
        },
    },

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        padding: '0em',
        width: '27em',

        [theme.fn.smallerThan('xs')]: {
            width: '19em',
        },
    },

    title: {
        fontWeight: 700,
        textTransform: "uppercase",
        fontFamily: `BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji ${theme.fontFamily}`,
        lineHeight: 1.2,

        [theme.fn.smallerThan('xs')]: {
            fontSize: '.9em',
        },
    },

    subtitle: {
        fontWeight: 700,
        textTransform: "none",
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,

        [theme.fn.smallerThan('xs')]: {
            fontSize: '.95em',
        },
    },

    body: {
        padding: theme.spacing.md,
    },

    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
                }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },

    table: {
        height: '23em',
        [theme.fn.smallerThan('xs')]: {
            height: '18em',
        },
    }

}));


function AllData() {
    //const { classes } = useStyles();

    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            
            <Center className={classes.card_container} mx="auto" maw="40em">
                <Card withBorder shadow="sm" radius="md" px="1em" py="0" className={classes.card}>
                    <Group noWrap spacing={0}>
                        <Avatar size="6em" variant="filled" color="red.9" src={<User color='plain' />} radius="0" />
                        <div className={classes.body}>
                            <Text className={classes.title} color="dimmed" mt="md" mb="md" size="lg">
                                Name: <Text span className={classes.subtitle} color="black" fw={700}>Example</Text>
                            </Text>
                            <Text className={classes.title} color="dimmed" mt="md" mb="md" size="lg">
                                Email: <Text span className={classes.subtitle} color="black" fw={700}>example@gmail.com</Text>
                            </Text>
                            <Text className={classes.title} color="dimmed" mt="md" mb="md" size="lg">
                                Balance: <Text span className={classes.subtitle} color="black" weight={700}>$100</Text>
                            </Text>
                        </div>
                    </Group>
                </Card>
            </Center>
            <hr />
            <Container radius={0} px={20} mb="1em" mih="8em">
                <Title order={2} mt="md" mb={5}>
                    All Data
                </Title>
                <ScrollArea className={classes.table} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table highlightOnHover striped>
                    <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr key="example1">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                        <tr key="example2">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                        <tr key="example3">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                        <tr key="example4">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                        <tr key="example5">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                        <tr key="example6">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                        <tr key="example7">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                        <tr key="example8">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                        <tr key="example9">
                            <td>Example</td>
                            <td>example@gmail.com</td>
                            <td>1234</td>
                            <td>1500</td>
                        </tr>
                    </tbody>
                </Table>
                </ScrollArea>
            </Container>
        </Layout>
    );
}

{/*
function AllData() {
    const ctx = React.useContext(UserContext)
    let current_user = ctx.current_user;

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div style={{margin: "2em"}}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-9 col-lg-8 col-xl-6 my-3" style={{border: "#3f3f3f  5px solid"}}>
                        <div className="row">
                            <div className="col-sm-5 bg-danger rounded-left">
                                <div className="card-block text-center text-white">
                                    <i className="fas fa-user-tie fa-7x mt-4"></i>
                                    <h1 className="font-weight-bold mt-4">{current_user[0]}</h1>
                                </div>
                            </div>
                            <div className="col-sm-7 bg-white rounded-right">
                                <h2 className="mt-3 text-center">Your Information</h2>
                                <hr className="mainHr"/>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h5><strong>Name: </strong>{current_user[0]}</h5>
                                    </div>
                                    <div className="col-sm-12">
                                        <h5><strong>Email: </strong>{current_user[2]}</h5>
                                    </div>
                                    <div className="col-sm-12">
                                        <h5><strong>Balance: </strong>${current_user[1]}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <h1>All Data</h1>
                <Table
                    tableColor = "" //dark
                    striped = "striped"
                    responsive = "responsive"
                    titles = {["Name", "Email", "Password", "Balance"]}
                />
                
                //<h5>{JSON.stringify(ctx)}</h5>
                //<br />
                //<h4><strong>Guest</strong> user will NOT make part of Users table. <strong>Guest</strong> only exists for testing purposes...</h4>
                
            </div>
        </Layout>
    )
}
*/}

/* Set the Global User Context to AllData Component */
export default function AllDataWithContext() {
    return (
        <>
            <NavBar />
            <UserProvider>
                <AllData />
            </UserProvider>
        </>
    )
}