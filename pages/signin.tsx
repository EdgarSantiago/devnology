import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { Btn, Div } from "../styles/Elements";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const SignIn: NextPage = () => {
  return (
    <Layout title="Entrar">
      <Div className="container-fluid" height="100vh">
        <Div className="row" height="100%">
          <Div
            className="col-7"
            style={{
              backgroundImage: "url(/bg.jpg)",
            }}
          />
          <Div className="col-5 px-4 align-self-center">
            <h1 className="display-3 mb-5" style={{ color: "#4777e0" }}>
              Happening now
            </h1>
            <h1 className="mb-4">Entrar</h1>
            <SignInComponent />
          </Div>
        </Div>
      </Div>
    </Layout>
  );
};

export default SignIn;

export function SignInComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submited, setSubmted] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Div width="50%">
      <form onSubmit={handleClick}>
        <Div className="mb-2">
          <label className="form-label mb-1">Nome de usuário</label>
          <input
            type="text"
            className="form-control py-1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Div>
        <Div className="mb-3">
          <label className="form-label mb-1">Senha</label>
          <input
            type="password"
            className="form-control py-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Div>
        <Btn
          type="submit"
          className="btn btn-outline-light d-block w-100 mx-auto py-1"
          br="15px"
          bg="#4777e0"
          border="1px solid #14131352 !important"
        >
          Entrar
        </Btn>
      </form>
      {error && <p className="mt-2 text-danger">Senha ou Usuário incorretos</p>}
    </Div>
  );
}
