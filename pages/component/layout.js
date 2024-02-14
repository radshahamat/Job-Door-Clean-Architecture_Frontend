import Head from "next/head";
import Footer from "./footer";
import Header from "./header";


export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className=" min-h-[80vh]">{children}</main>
      <Footer />
    </>
  )
}