import { ReactElement, useState } from "react";
import type { NextPage } from "next";
import type { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { Div, Btn } from "../../styles/Elements";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

type typeLink = {
  label: string;
  link: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

interface Data {
  links: typeLink;
}

const BlogPost = ({
  label = "This is the default title",
  link = "somelink",
  _id,
}: typeLink): ReactElement => {
  const [title, setTitle] = useState(label);
  const [updateLink, setUpdateLink] = useState(link);
  const router = useRouter();

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const productUpdate = {
        label: title,
        link: updateLink,
      };
      const res = await axios.put(
        `http://localhost:3000/api/links/${_id}`,
        productUpdate
      );
      if (res.data.status === "sucesso") {
        router.push(`/`);
      }
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
          axios.delete("http://localhost:3000/api/links/" + id);
          router.push(`/`);
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
                onClick={() => handleDelete(_id)}
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

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  const id = params?.lid;
  const linksRes = await axios.get(`http://localhost:3000/api/links/${id}`);
  const data = JSON.parse(JSON.stringify(linksRes.data));
  return {
    props: { label: data.label, link: data.link, _id: data._id },
  };
};

export const getStaticPaths: GetStaticPaths<any> = async () => {
  const linksRes = await axios.get("http://localhost:3000/api/links");
  const data = JSON.parse(JSON.stringify(linksRes.data));

  const paths = data.links.map((link: typeLink) => {
    return {
      params: { lid: String(link._id) },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
