import { StyledFooter } from "components/styles/Footer.styled";
import React from "react";
import { FaItunesNote } from "react-icons/fa";

const Footer = () => {
  return (
    <StyledFooter color="blue">
      <FaItunesNote /> This footer is proudly brought to you by Kate T B. 1F41D 🐝 &#129409;
    </StyledFooter>
  );
};

export default Footer;
