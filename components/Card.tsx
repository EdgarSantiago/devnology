import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Div, Btn } from "../styles/Elements";
import Footer from "./Footer";
import axios from "axios";

type Props = {
  title?: string;
  link?: string;
  id?: string;
  deleteLink?: any;
};

const Layout = ({
  title = "This is the default title",
  link = "somelink",
  id,
  deleteLink,
}: Props) => {
  return (
    <Div className="card" whileHover={{ border: "1px solid #4777e0" }}>
      <div className="card-body">
        <h5 className="card-title mb-1">{title}</h5>
        <p className="mb-1">{link}</p>

        <Link href={`/link/${id}`}>
          <Btn
            className="btn btn-outline-light me-1 mx-auto py-0"
            bg="#4777e0"
            border="1px solid #14131328 !important"
          >
            Ver
          </Btn>
        </Link>
        <Btn
          className="btn btn-outline-light me-1 py-0"
          bg="#4777e0"
          border="1px solid #14131328 !important"
          onClick={() => {
            navigator.clipboard.writeText(link), alert(`Link ${link} copiado`);
          }}
        >
          Copiar link
        </Btn>
        <Btn
          className="btn btn-outline-light py-0"
          bg="#e04747"
          border="1px solid #14131328 !important"
          onClick={() => deleteLink(id)}
        >
          Deletar
        </Btn>
      </div>
    </Div>
  );
};

export default Layout;
