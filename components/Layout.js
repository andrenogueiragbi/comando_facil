import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";



export default function Layout({children}) {
 return (
    <>
        <Head>
            <link rel='shortcut ion' href='/images/favivon.png'/>
            <title>Comando Fácil</title>
            

        </Head>
        <Navbar/>
        <main className="main-container">{children}</main>
        <Footer/>
    </>
   
  );
}