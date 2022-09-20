import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  height?: string;
  width?: string;
  bg?: string;
  heightmd?: string;
  widthmd?: string;
  border?: string;
  br?: string;
}

export const Div = styled(motion.div)<Props>`
  height: ${(props) => props.height || ""};
  width: ${(props) => props.width || ""};
  background-color: ${(props) => props.bg || ""};
  border: ${(props) => props.border || ""};
  @media screen and (min-width: 768px) {
    height: ${(props) => props.heightmd || ""};
    width: ${(props) => props.widthmd || ""};
  }
`;

export const Btn = styled(motion.button)<Props>`
  height: ${(props) => props.height || ""};
  width: ${(props) => props.width || ""};
  background-color: ${(props) => props.bg || ""};
  border: ${(props) => props.border || ""};
  border-radius: ${(props) => props.br || ""};
  @media screen and (min-width: 768px) {
    height: ${(props) => props.heightmd || ""};
    width: ${(props) => props.widthmd || ""};
  }
`;
