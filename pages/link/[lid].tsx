import type { ReactElement } from "react";
import type { NextPage } from "next";
import type { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { Div } from "../../styles/Elements";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleDelete = async (id?: string) => {
    try {
      if (window.confirm("Are you sure")) {
        await axios.delete("http://localhost:3000/api/links/" + id);
      }
      router.push(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Div
        className="container"
        widthmd="32rem"
        height="100vh"
        style={{ minHeight: "100vh" }}
      >
        <Div className="row" height="100%">
          <Div className="col align-self-center">
            <Card
              title={label}
              link={link}
              id={_id}
              deleteLink={handleDelete}
            />
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
