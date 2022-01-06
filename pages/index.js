import Head from "next/head";
import Content from "../components/content/Content";
import Sidebar from "../components/sidebar/Sidebar";
import HomeComponent from "../components/home/Home";
import { ReactQueryDevtools } from "react-query/devtools";

export default function Home() {
  return (
    <div>
      <Head>
        <title>COVID-19 Dashboard</title>
      </Head>
      <Sidebar />
      <Content>
        <HomeComponent />
      </Content>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
