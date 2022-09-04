import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { access_token, user_id, user_name } from "../config";
import axios from "axios";

const Home: NextPage = () => {
  const url = `https://graph.facebook.com/v14.0/${user_id}?fields=business_discovery.username(${user_name}){followers_count,media_count,follows_count}&access_token=${access_token}`;

  const [bizData, setBizData] = useState();

  useEffect(() => {
    fetchMainData();
  }, [bizData]);

  const fetchMainData = async () => {
    const returnData = await axios.get(url);
    const { followers_count } = returnData.data.business_discovery;
    setBizData(followers_count);
  };
  return (
    <>
      <Head>
        <title>Insta_analysis_tool</title>
        <meta name="description" content="簡易的なインスタ分析ツールです" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{bizData}</main>
    </>
  );
};

export default Home;
