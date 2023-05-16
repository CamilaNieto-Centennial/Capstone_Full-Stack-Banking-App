import {
    createStyles,
    Header,
    Group,
    Button,
    Text,
    Avatar,
    Image,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, UserProvider } from '../components/userContext';
import { auth } from '../lib/initAuth';


const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: theme.fontSizes.md,

        [theme.fn.smallerThan('lg')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('lg')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        [theme.fn.largerThan('lg')]: {
            display: 'none',
        },
    },
}));




export default function NavBar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    const [user, setUser] = useState(null);
    const { userEmail, updateUserEmail } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in
                setUser(authUser);
                updateUserEmail(authUser.email); // Set the userEmail value here
            } else {
                // User is signed out
                setUser(null);
                updateUserEmail(''); // Reset the userEmail value when user signs out
            }
        });
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array to run the effect only once

    return (
        <Box pb={0}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Image height={30} width="auto" src="/images/tranzzacto.png" alt="With default placeholder" withPlaceholder />

                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <a href="/" className={classes.link}>
                            Home
                        </a>
                        <a href="/deposit" className={classes.link}>
                            Deposit
                        </a>
                        <a href="/withdraw" className={classes.link}>
                            Withdraw
                        </a>
                        <a href="/alldata" className={classes.link}>
                            All Data
                        </a>
                    </Group>

                    {user ? (
                        <Group spacing="1.5rem" className={classes.hiddenMobile}>
                            <Group spacing=".5rem">
                                <Avatar radius="xl" color="red" />
                                <Text fw={700}>
                                    {user.displayName}
                                </Text>
                            </Group>
                            <Button onClick={() => auth.signOut()}>
                                <a href="">Logout</a>
                            </Button>
                        </Group>
                    ) : (
                        <Group className={classes.hiddenMobile}>
                            <Button variant="default">
                                <a href="/login">Login</a>
                            </Button>
                            <Button>
                                <a href="/createaccount">Sign up</a>
                            </Button>
                        </Group>
                    )}
                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="TRANZZACTO"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                {/*<ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">*/}
                <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                <a href="/" className={classes.link}>
                    Home
                </a>
                <a href="/deposit" className={classes.link}>
                    Deposit
                </a>
                <a href="/withdraw" className={classes.link}>
                    Withdraw
                </a>
                <a href="/alldata" className={classes.link}>
                    All Data
                </a>

                <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                {user ? (
                    <Group position="center" grow pb="xl" px="md">
                        <Group spacing=".5rem">
                            <Avatar radius="xl" color="red" />
                            <Text fw={700}>
                                {user.displayName}
                            </Text>
                        </Group>
                        <Button onClick={() => auth.signOut()}>
                            <a href="">Logout</a>
                        </Button>
                    </Group>
                ) : (
                    <Group position="center" grow pb="xl" px="md">
                        <Button variant="default">
                            <a href="/login">Login</a>
                        </Button>
                        <Button>
                            <a href="/createaccount">Sign up</a>
                        </Button>
                    </Group>
                )}
                {/*</ScrollArea>*/}
            </Drawer>
        </Box>
    );
}