import { ReactElement, useState, useEffect } from "react";
import type { NextPage } from "next";
import type { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { Div, Btn } from "../../styles/Elements";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

import { Link as ModelLink } from "../../models/Link";

import { typeLink } from "../../inteface/frontend";

const BlogPost = ({
  label = "This is the default title",
  link = "somelink",
}: typeLink): ReactElement => {
  const router = useRouter();
  const [title, setTitle] = useState(label);
  const [updateLink, setUpdateLink] = useState(link);
  const [id, setId] = useState(link);
  const [data, setData] = useState();

  useEffect(() => {
    const lid = router.query.lid;
    const fetchData = async () => {
      const data = await axios.get(`/api/links/${lid}`);
      return data;
    };
    fetchData()
      .then((res) => {
        setTitle(res.data.label);
        setUpdateLink(res.data.link);
        setId(res.data._id);
      })
      .catch(console.error);
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const productUpdate = {
        label: title,
        link: updateLink,
      };
      await axios.put(`/api/links/${id}`, productUpdate).then((res) => {
        if (res.data.status === "success") {
          router.push("/");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

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
          axios.delete(`/api/links/${id}`).then((res) => {
            console.log(res);
            if (res.data.status === "item Deletado") {
              router.push("/");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("O link não foi deletado", "", "info");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title={label}>
      <Div className="container" widthmd="32rem" height="80vh">
        <Div className="row px-2 px-md-0" height="100%">
          <Div className="col-12 align-self-center card py-2">
            <form onSubmit={handleUpdate}>
              <Div className="mb-2 text-center">
                <h3>Editar</h3>
              </Div>
              <Div className="mb-2">
                <label className="form-label mb-1">Titulo</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control py-1"
                />
              </Div>
              <Div className="mb-3">
                <label className="form-label mb-1">Link</label>
                <input
                  value={updateLink}
                  onChange={(e) => setUpdateLink(e.target.value)}
                  type="text"
                  className="form-control py-1"
                />
              </Div>
              <Btn
                type="submit"
                className="btn btn-outline-light d-block w-100 mx-auto py-1"
                br="15px"
                bg="#4777e0"
                border="1px solid #14131352 !important"
              >
                Atualizar
              </Btn>
              <Btn
                type="submit"
                className="btn btn-outline-light d-block w-100 mx-auto py-1 my-2 "
                br="15px"
                bg="#eb5050"
                border="1px solid #14131352 !important"
                onClick={() => handleDelete(id)}
              >
                Deletar
              </Btn>
              <Link href="/">
                <Btn
                  type="submit"
                  className="btn btn-outline-light d-block w-100 mx-auto py-1 my-2 "
                  br="15px"
                  bg="#5a5f6b"
                  border="1px solid #14131352 !important"
                >
                  Voltar
                </Btn>
              </Link>
            </form>
          </Div>
        </Div>
      </Div>
    </Layout>
  );
};

export default BlogPost;
