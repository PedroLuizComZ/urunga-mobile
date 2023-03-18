import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
