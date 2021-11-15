import { StyledFooter } from "components/styles/Footer.styled";
import React from "react";
import { FaItunesNote } from "react-icons/fa";

const Footer = () => {
  return (
    <StyledFooter color="blue">
      <FaItunesNote /> This footer is brought to you by Kate B. 1F41D 🐝
    </StyledFooter>
  );
};

export default Footer;
