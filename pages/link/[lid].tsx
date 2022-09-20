import type { ReactElement } from "react";
import type { NextPage } from "next";
import type { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { Div } from "../../styles/Elements";
import Layout from "../../components/Layout";

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
}: typeLink): ReactElement => {
  return (
    <Layout>
      <Div className="container" widthmd="32rem" style={{ minHeight: "100vh" }}>
        <h1>{label}</h1>
        <h1>{link}</h1>
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
    props: { label: data.label, link: data.link },
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
