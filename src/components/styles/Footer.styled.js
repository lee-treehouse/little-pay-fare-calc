import styled from "styled-components";

export const StyledFooter = styled.footer`
  color: ${({ color }) => color};
  margin-top: 1em;
  padding-top: 0.5em;
  border-top: 1px solid ${({ color }) => color};
`;
