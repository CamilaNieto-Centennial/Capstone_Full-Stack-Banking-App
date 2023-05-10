import Head from 'next/head';
//import Image from 'next/image'
import Layout, {siteTitle} from '../components/layout';
import { Table, BankForm} from '../components/context';
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

    return (
      <Layout>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <div className={classes.full_container}>
          <Paper className={classes.form_container} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center"  mb="xs">Welcome to the Banking App Name!</Title>
            <Image
              src="/images/bank.png"
              height={240}
              alt="Bank Icon"
              fit='contain'
            />
          </Paper>
          <div className={classes.image_container}></div>
        </div>
      </Layout>
    );
}



{/*
function Home(){
  const ctx = React.useContext(UserContext)
  let current_user = ctx.current_user;
  return(
    <Layout>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <div className="container-big">
            <div className="container-left">
                <div className="row subcontainer">
                    <div className="col col-8 col-sm-7 col-md-6 col-lg-7 col-xl-6 my-auto mx-auto">
                        <Card
                            txtcolor="black"
                            header="BadBank Landing Page"
                            headercolor = "white"
                            headerBackground = "#592e83"
                            title={`Welcome to the bank ${current_user[0]}!`}
                            text="You can use this bank"
                            body={(<img src="./img/bank.png" className="img-fluid" alt="Responsive image"></img>)}
                        />
                    </div>
                </div>
            </div>
            <div className="container-right"></div>
        </div>
    </Layout>
  )
}
*/}

/* Set the Global User Context to Home Component */
export default function HomeWithContext(){
  return (
  <>
    <NavBar />
    <UserProvider>
      <Home />
    </UserProvider>
  </>
  )
}