import Link from "next/link";
import React, { ReactNode } from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineCode,
  AiFillHeart,
} from "react-icons/ai";

const Footer = () => (
  <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 border-top">
      <div className="col-md-8 d-flex align-items-center">
        <h4 className="mb-2 me-2 mb-md-0 lh-1">
          <AiOutlineCode />
        </h4>
        <span className="mb-2 mb-md-0">
          &copy; {new Date().getFullYear()}, Desenvolvido com{" "}
          <AiFillHeart className="text-danger" /> por{" "}
          <Link href="https://edgarz.tech/">Edgar Santiago</Link>
        </span>
      </div>

      <ul className="nav col-12 col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <Link href="https://github.com/EdgarSantiago">
            <h3 className="mb-2  mb-md-0 lh-1 click">
              <AiFillGithub />
            </h3>
          </Link>
        </li>
        <li className="ms-3">
          <Link href="https://www.linkedin.com/in/edgar-santiago-2ba816165/">
            <h3 className="mb-2 me-2 mb-md-0 lh-1 click">
              <AiFillLinkedin />
            </h3>
          </Link>
        </li>
      </ul>
    </footer>
  </div>
);

export default Footer;
