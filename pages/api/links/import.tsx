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
          $("a") // Escolha o tipo de tag para pxar
            .map((_: any, a: any) => $(a).attr("href")) // Extrai o href de cada tag <a>
            .toArray() // Converte o cheerio para array
        ),
      ];

      axios.get("https://devgo.com.br/").then(({ data }) => {
        const $ = cheerio.load(data);
        const links = extractLinks($);

        links.forEach((element) => {
          //Joga os links puxados para o DB
          Link.create({ link: String(element), label: "default" });
        });
        res.status(201);
      });
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
};
