import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Div, Btn } from "../styles/Elements";
import Footer from "./Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { AiFillCopy, AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

type Props = {
  title?: string;
  edit?: boolean;
  link?: string;
  id?: string;
  deleteLink?: any;
};

const Layout = ({
  title = "This is the default title",
  link = "somelink",
  id,
  edit,
  deleteLink,
}: Props) => {
  return (
    <Div className="card" whileHover={{ border: "1px solid #4777e0" }}>
      <div className="card-body">
        <h5 className="card-title mb-1">{title}</h5>
        <p className="mb-1">{link}</p>

        {edit ? (
          <Link href={`/link/${id}`}>
            <Btn
              className="btn btn-outline-light me-1 mx-auto py-0"
              bg="#5a5f6b"
              border="1px solid #57525228 !important"
            >
              <AiFillEdit /> Editar
            </Btn>
          </Link>
        ) : (
          <></>
        )}
        <Btn
          className="btn btn-outline-light me-1 py-0"
          bg="#4777e0"
          border="1px solid #14131328 !important"
          onClick={() => {
            navigator.clipboard.writeText(link),
              Swal.fire({
                title: `Link ${link} copiado`,
                confirmButtonText: "Ok",
                customClass: {
                  actions: "my-actions",
                  cancelButton: "order-1 right-gap",
                  confirmButton: "order-2",
                  denyButton: "order-3",
                },
              });
          }}
        >
          <AiFillCopy /> Copiar link
        </Btn>
        <Btn
          className="btn btn-outline-light py-0"
          bg="#eb5050"
          border="1px solid #14131328 !important"
          onClick={() => deleteLink(id)}
        >
          <AiTwotoneDelete /> Deletar
        </Btn>
      </div>
    </Div>
  );
};

export default Layout;
