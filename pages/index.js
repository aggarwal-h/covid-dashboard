import Head from "next/head";
import Content from "../components/content/Content";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";

export default function Home() {
  return (
    <div className="wrapper">
      <Head>
        <title>COVID-19 Dashboard</title>
      </Head>
      <Sidebar />
      <Content>
        <Main />
      </Content>
    </div>
  );
}
