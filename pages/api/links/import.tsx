import dbConnect from "../../../util/mongo";
import { Link } from "../../../models/Link";
import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import cheerio from "cheerio";

type typeLink = {
  label: string;
  link: string;
};

interface Data {
  links: typeLink[];
  status: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, cookies } = req;

  const token = cookies.token;

  dbConnect();

  if (method === "POST") {
    try {
      const extractLinks = ($: any) => [
        ...new Set(
          $(".blog-article-card a") // Select pagination links
            .map((_: any, a: any) => $(a).attr("href")) // Extract the href (url) from each link
            .toArray() // Convert cheerio object to array
        ),
      ];

      axios.get("https://devgo.com.br/").then(({ data }) => {
        const $ = cheerio.load(data);
        const links = extractLinks($);
        console.log(links);
        links.forEach((element) => {
          Link.create({ link: String(element), label: "default" });
        });
        res
          .status(201)
          .json({ links: [{ label: "", link: "" }], status: "success" });
      });
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
};
