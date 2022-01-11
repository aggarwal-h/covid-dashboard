import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "https://covid-dashboard-ruby.vercel.app/api/";
} else {
  axios.defaults.baseURL = "http://localhost:3000/api/";
}

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
