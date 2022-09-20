import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Div } from "../styles/Elements";
import Footer from "./Footer";
type Props = {
  children?: ReactNode;
  title?: string;
};

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Div
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    transition={{ duration: 0.4, type: "easeInOut" }}
    style={{ minHeight: "100vh" }}
  >
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Footer />
    {children}
  </Div>
);

export default Layout;
