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

  const link = req.body.link;

  dbConnect();

  if (method === "POST") {
    try {
      const extractLinks = ($: any) => [
        ...new Set(
          $("a") // Escolha o tipo de tag para pxar
            .map((_: any, a: any) => $(a).attr("href")) // Extrai o href de cada tag <a>
            .toArray() // Converte o cheerio para array
        ),
      ];

      axios.get(link).then(({ data }) => {
        const $ = cheerio.load(data);
        const links = extractLinks($);

        links.forEach((element) => {
          //Joga os links puxados para o DB
          //Link.findOne(
          //  { link: String(element) },
          //  function (err: any, link: typeLink) {
          //    if (err) return err;
          //    console.log(link);
          //  }
          //);

          const elLink = Link.findOne({ link: String(element) });

          //Link.create({ link: String(element), label: "default" });
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
