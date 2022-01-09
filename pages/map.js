import Head from "next/head";
import Content from "../components/content/Content";
import Sidebar from "../components/sidebar/Sidebar";
import { ReactQueryDevtools } from "react-query/devtools";

export default function Map() {
  return (
    <div className="wrapper">
      <Head>
        <title>COVID-19 Dashboard</title>
      </Head>
      <Sidebar />
      <Content>
        <h1>TODO</h1>
      </Content>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
