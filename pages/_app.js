import Head from 'next/head';
import '../styles/globals.css'; // Import global CSS here

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Essential metadata tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Explore the candidate case study task" />
        <meta name="keywords" content="your, keywords, here" />

        <link rel="icon" href="/logo.svg" />
      
        <meta property="og:title" content="JackXFocaldata" />
        <meta property="og:description" content="Explore the candidate case study task" />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content="https://focaldata.jack-robertson.co.uk/" />
        <meta name="twitter:card" content="summary_large_image" />

      
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
