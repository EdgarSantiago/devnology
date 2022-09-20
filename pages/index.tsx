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

type typeLink = {
  label: string;
  link: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

interface Data {
  links: typeLink[];
}

const Home: NextPage<Data> = (data) => {
  const [close, setClose] = useState(true);
  const [linkList, setLinkList] = useState(data.links);
  const handleDelete = async (id?: string) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/links/" + id);
      setLinkList(linkList.filter((link) => link._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Div className="container p-3" style={{ minHeight: "100vh" }}>
        <Div className="row">
          <h3>
            Seus links{" "}
            <span
              className="btn btn-outline-success py-1"
              onClick={() => setClose(!close)}
            >
              {close ? "x" : "+"}
            </span>
          </h3>
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

        <Div className="row g-2">
          {linkList.map((l, index) => (
            <Div className="col-4" key={index}>
              <Card
                id={l._id}
                title={l.link}
                link={l.label}
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

  const linksRes = await axios.get("http://localhost:3000/api/links");
  const data = JSON.parse(JSON.stringify(linksRes.data));
  return {
    props: {
      links: data.links,
    },
  };
};

export function AddLinkComponent() {
  const [label, setLabel] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);

  const handleCreate = async () => {
    try {
      const newProduct = {
        label,
        link,
      };
      await axios.post("http://localhost:3000/api/links", newProduct);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Div width="25%">
      <form onSubmit={handleCreate}>
        <Div className="mb-2">
          <label className="form-label mb-1">Titulo</label>
          <input
            type="text"
            className="form-control py-1"
            onChange={(e) => setLabel(e.target.value)}
          />
        </Div>
        <Div className="mb-2">
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
