import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { access_token, user_id, user_name } from "../config";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import Layout from "../components/Layout";
import { ScrollArea } from "@mantine/core";

const Home: NextPage = () => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );

  const followerUrl = `https://graph.facebook.com/v14.0/${user_id}?fields=business_discovery.username(${user_name}){followers_count,media_count,follows_count}&access_token=${access_token}`;
  const genderUrl = `https://graph.facebook.com/v14.0/${user_id}/insights?access_token=${access_token}&metric=audience_gender_age&period=lifetime`;
  const profile_views = `https://graph.facebook.com/v14.0/${user_id}/insights?access_token=${access_token}&metric=profile_views&period=day&since=Aug 10 10:10:00 JST 2022&until=Sep 9 10:10:00 JST 2022`;
  const [female, setFemaile] = useState();
  const [male, setMale] = useState();
  const [views, setViews] = useState([]);

  useEffect(() => {
    fetchProfileViews();
    fetchGender();
  }, []);

  const data = {
    labels: ["女性", "男性"],
    datasets: [
      {
        label: "# of Votes",
        data: [female, male],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const fetchProfileViews = async () => {
    const objData = await axios.get(profile_views);
    const objArray = objData.data.data[0].values;
    console.log(objArray);
    setViews(objArray);
  };

  const labels = views.map((v) => v.end_time);

  const viewData = views.map((v) => v.value);

  const follwer = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: viewData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const fetchGender = async () => {
    //リファクタする
    const returnData = await axios.get(genderUrl);
    const a = returnData.data.data[0].values[0].value;
    const array = Object.keys(a).map((k) => ({ key: k, value: a[k] }));
    const regexp = /F/g;
    const check = array.filter((v) => v.key.match(regexp));
    const all = check.map((v) => v.value);
    const reducer = (sum, currentValue) => sum + currentValue;
    const FemaleAll = all.reduce(reducer);
    setFemaile(FemaleAll); //女性の合計人数

    const b = returnData.data.data[0].values[0].value;
    const arrayB = Object.keys(a).map((k) => ({ key: k, value: b[k] }));
    const regexpB = /M/g;
    const checkB = arrayB.filter((v) => v.key.match(regexpB));
    const allB = checkB.map((v) => v.value);
    const reducerB = (sumB, currentValueB) => sumB + currentValueB;
    const maleAllB = allB.reduce(reducerB);
    setMale(maleAllB); //男性の合計人数
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Insta_analysis_tool</title>
          <meta name="description" content="簡易的なインスタ分析ツールです" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ScrollArea style={{ height: "100%" }}>
          <div className="">
            <p>フォロワー男女比</p>
            <div className="text-3xl w-96 h-96">
              <Doughnut data={data}></Doughnut>
            </div>
            <div className="text-3xl w-full h-96">
              <Line options={options} data={follwer} />
            </div>
          </div>
        </ScrollArea>
      </Layout>
    </>
  );
};

export default Home;
