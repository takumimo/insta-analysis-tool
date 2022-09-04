import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { access_token, user_id, user_name } from "../config";

const Home: NextPage = () => {
  const url = `https://graph.facebook.com/v14.0/${user_id}?fields=business_discovery.username(${user_name}){followers_count,media_count,media{comments_count,like_count}}&access_token=${access_token}`;

  useEffect(() => {
    console.log(url);
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
};

export default Home;
