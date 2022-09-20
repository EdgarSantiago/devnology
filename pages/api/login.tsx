import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

type Login = {
  name: string;
  password: string;
  status: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Login>) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", String(process.env.TOKEN), {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ status: "Succesfull", name: "", password: "" });
    } else {
      res.status(400).json({ status: "Error", name: "", password: "" });
    }
  }
};

export default handler;
