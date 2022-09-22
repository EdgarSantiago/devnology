import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { Div, Btn } from "../styles/Elements";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

import { typeLink, DataLinks } from "../inteface/frontend";

const Home: NextPage<DataLinks> = (data) => {
  const [close, setClose] = useState(false);
  const [close2, setClose2] = useState(false);
  const [linkList, setLinkList] = useState(data.links);
  const router = useRouter();

  const handleDelete = async (id?: string) => {
    try {
      Swal.fire({
        title: "Você quer deletar esse link?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/api/links/${id}`);
          setLinkList(linkList.filter((link) => link._id !== id));
          Swal.fire("Link deletado", "", "success");
        } else if (result.isDenied) {
          Swal.fire("O link não foi deletado", "", "info");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title="Início">
      <Div className="container p-3" style={{ minHeight: "100vh" }}>
        <Div className="row">
          <Div className="col-12 d-inline d-md-flex">
            <h3>
              Seus links{" "}
              <span
                className="btn btn-outline-danger py-0 px-1"
                onClick={() => setClose(!close)}
              >
                {close ? (
                  <>
                    Fechar <AiOutlineClose />
                  </>
                ) : (
                  <>
                    Adicionar <AiOutlinePlus />
                  </>
                )}
              </span>
            </h3>
            <h3 className="ms-0 ms-md-3">
              Importar{" "}
              <span
                className="btn btn-outline-danger py-0 px-1"
                onClick={() => setClose2(!close2)}
              >
                {close2 ? (
                  <>
                    Fechar <AiOutlineClose />
                  </>
                ) : (
                  <>
                    Importar <AiOutlinePlus />
                  </>
                )}
              </span>
            </h3>
          </Div>
        </Div>

        <AnimatePresence>
          {close && (
            <Div
              className="row"
              initial={{ opacity: 0, height: "0px" }}
              animate={{ height: "30vh", opacity: 1 }}
              exit={{ height: "0px", opacity: 0 }}
            >
              <AddLinkComponent />
            </Div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {close2 && (
            <Div
              className="row"
              initial={{ opacity: 0, height: "0px" }}
              animate={{ height: "22vh", opacity: 1 }}
              exit={{ height: "0px", opacity: 0 }}
            >
              <ImportLinkComponent />
            </Div>
          )}
        </AnimatePresence>

        <Div className="row g-2">
          {linkList.map((l, index) => (
            <Div className="col-12 col-md-4" key={index}>
              <Card
                id={l._id}
                title={l.label}
                link={l.link}
                edit={true}
                deleteLink={handleDelete}
              />
            </Div>
          ))}
        </Div>
      </Div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const linksRes = await axios.get(`https://devnology.vercel.app/api/links`);
  const data = JSON.parse(JSON.stringify(linksRes.data));
  return {
    props: {
      links: data.links,
    },
  };
};

// componente para adicionar Link ao DB
export function AddLinkComponent() {
  const [label, setLabel] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      const newProduct = {
        label,
        link,
      };
      const res = await axios.post("/api/links", newProduct);

      if (res.data.status === "success") {
        router.push(`/link/${res.data.links._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Div width="80%" widthmd="25%">
      <form onSubmit={handleCreate}>
        <Div className="mb-2">
          <label className="form-label mb-1">Titulo</label>
          <input
            type="text"
            className="form-control py-1"
            onChange={(e) => setLabel(e.target.value)}
          />
        </Div>
        <Div className="mb-3">
          <label className="form-label mb-1">Link</label>
          <input
            type="text"
            className="form-control py-1"
            onChange={(e) => setLink(e.target.value)}
          />
        </Div>
        <Btn
          type="submit"
          className="btn btn-outline-light d-block w-100 mx-auto py-1"
          br="15px"
          bg="#4777e0"
          border="1px solid #14131352 !important"
        >
          Adicionar
        </Btn>
      </form>
    </Div>
  );
}

// componente para importar Links ao DB
export function ImportLinkComponent() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImport = async (e: any) => {
    e.preventDefault();
    try {
      const importIt = {
        link,
      };
      const res = await axios.post(`/api/links/import`, importIt);
      if (res.data.status === "success") {
        setLoading(true);
        setTimeout(() => {
          router.reload();
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Div width="80%" widthmd="25%">
      <form onSubmit={handleImport}>
        <Div className="mb-3">
          <label className="form-label mb-1">Link</label>
          <input
            type="text"
            className="form-control py-1"
            onChange={(e) => setLink(e.target.value)}
            placeholder="Exemplo: https://siteparaimportaraqui.com"
          />
        </Div>
        <Btn
          type="submit"
          className="btn btn-outline-light d-block w-100 mx-auto py-1"
          br="15px"
          bg="#4777e0"
          border="1px solid #14131352 !important"
        >
          Importar
        </Btn>
        {loading && <h4 className="text-danger">Importando links...</h4>}
      </form>
    </Div>
  );
}
