import dbConnect from "../../../util/mongo";
import { Link } from "../../../models/Link";
import type { NextApiRequest, NextApiResponse } from "next";
import { strSmartTrim } from "../../../util/string";

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
        //pega o link do req.body
        const $ = cheerio.load(data); //carrega o link
        const links = extractLinks($); //extrai os links
        links.forEach((l) => {
          //Joga os links puxados para o DB
          Link.findOne(
            { link: String(l) },
            function (err: any, links: typeLink) {
              if (links === null || links.link !== l) {
                //verifica se o link não existe, se não existe ele adiciona ao db
                Link.create({
                  link: String(l),
                  label: strSmartTrim(String(l), 10),
                });
              } else {
                console.log("Link já existe");
              }
              if (err) return err;
            }
          );
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
