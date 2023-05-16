import Head from 'next/head';
//import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout';
import { UserContext, UserProvider } from '../components/userContext';
import NavBar from '../components/navbar';
import React, { useState, useEffect } from 'react';
import { auth } from '../lib/initAuth';

import {
  Title,
  Text,
  Anchor,
  rem,
  createStyles,
  Paper,
  Image,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  full_container: {
    height: `calc(100vh - 60px)`,
    position: 'relative',
    background: 'linear-gradient(20deg, purple, darkslateblue);',
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
    background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("/images/credit_card1.png") center/cover no-repeat',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));


export function Home() {
  const { classes } = useStyles();

  const [user, setUser] = useState(null);

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

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {user ? (
        <div className={classes.full_container}>
          <Paper className={classes.form_container} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mb="xs">Welcome to Tranzzacto {user.displayName}!</Title>
            <Image
              src="/images/bank.png"
              height={240}
              alt="Bank Icon"
              fit='contain'
            />
            <br />
          </Paper>
          <div className={classes.image_container}></div>
        </div>
      ) : (
        <div className={classes.full_container}>
          <Paper className={classes.form_container} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mb="xs">Welcome to Tranzzacto!</Title>
            <Image
              src="/images/bank.png"
              height={240}
              alt="Bank Icon"
              fit='contain'
            />
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

/* Set the Global User Context to Home Component */
export default function HomeWithContext() {
  return (
    <UserProvider>
        <NavBar />
        <Home />
    </UserProvider>
  )
}