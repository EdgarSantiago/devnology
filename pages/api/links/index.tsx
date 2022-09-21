import dbConnect from "../../../util/mongo";
import { Link } from "../../../models/Link";
import type { NextApiRequest, NextApiResponse } from "next";

import { DataLinks } from "../../../inteface/backend";

export default async (req: NextApiRequest, res: NextApiResponse<DataLinks>) => {
  const { method, cookies } = req;

  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const links = await Link.find();
      res.status(200).json({ links: links, status: "success" });
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json({
        links: [{ label: "", link: "" }],
        status: "Not authenticated!",
      });
    }
    try {
      const link = await Link.create(req.body);
      res.status(201).json({ links: link, status: "success" });
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
};
