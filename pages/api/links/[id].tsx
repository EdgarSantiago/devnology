import dbConnect from "../../../util/mongo";
import { Link } from "../../../models/Link";
import type { NextApiRequest, NextApiResponse } from "next";

type typeLink = {
  label: string;
  link: string;
};

interface Data {
  links: typeLink;
  status: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const link = await Link.findById(id);
      res.status(200).json(link);
    } catch (err) {
      res.status(401).json({
        links: { label: "", link: "" },
        status: "item Deletado",
      });
    }
  }

  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json({
        links: { label: "", link: "" },
        status: "Não autorizado",
      });
    }
    try {
      const link = await Link.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({
        links: link,
        status: "success",
      });
    } catch (err) {
      res.status(401).json({
        links: { label: "", link: "" },
        status: "Falha",
      });
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json({
        links: { label: "", link: "" },
        status: "Não autorizado",
      });
    }
    try {
      await Link.findByIdAndDelete(id);
      res.status(200).json({
        links: { label: "", link: "" },
        status: "item Deletado",
      });
    } catch (err) {
      res.status(401).json({
        links: { label: "", link: "" },
        status: "Falha ao delete",
      });
    }
  }
};
