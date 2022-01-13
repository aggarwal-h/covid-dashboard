import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="keywords"
            content="covid, cases, covid-19, detailed cases, daily cases, new cases, new deaths"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="1 days" />
          <meta property="og:image" content="/assets/img/covid_large.png" />
          <meta
            name="google-site-verification"
            content="ZiSxnIjn5yZyBU0Sw72JvfDjh-B84Xspy-qO7EHVlTM"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
