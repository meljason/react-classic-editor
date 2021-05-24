import styled from "styled-components";
import React, { useRef } from "react";
import { usePopup } from "../../hooks";
import { FaLink } from "react-icons/fa";

const Container = styled.div`
  background: #F9F9F9;
  width: 240px;
  height: 40px;
  text-align: center;
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0px;
  left: 0px;
  z-index: 999;
  opacity: 0;
  border-radius: 5px;
  -webkit-transform: none;
  transform: none;
  -webkit-transition: opacity 0.2s ease-out,
    -webkit-transform 0.5s cubic-bezier(0, 1, 0.5, 1);
  transition: opacity 0.2s ease-out,
    -webkit-transform 0.5s cubic-bezier(0, 1, 0.5, 1);
  transition: opacity 0.2s ease-out, transform 0.5s cubic-bezier(0, 1, 0.5, 1);
  transition: opacity 0.2s ease-out, transform 0.5s cubic-bezier(0, 1, 0.5, 1),
    -webkit-transform 0.5s cubic-bezier(0, 1, 0.5, 1);
  visibility: hidden;

  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
`;
const LinkPreview = styled.a`
  text-align: left;
  margin: auto 0;
  text-decoration: none;
  color: #4f90f2;
  margin-left: 10px;
  font-weight: 500;
  font-size: 16px;
  &:hover {
    color: #3c7ee0;
  }
` 
const Icon = styled(FaLink)`
  margin: auto 0;
  color: rgba(0,0,0,0.5);
  font-size: 22px;
  margin-left: 10px;
  cursor: pointer;
  padding: 5px;
`

interface LinkProps {
  link: string | null;
}

export const Preview: React.FC<LinkProps> = ({ link }) => {
  const wrapperRef = useRef(null);
  usePopup(wrapperRef, 'link-preview');

  return (
    <Container ref={wrapperRef} id="link-preview">
      <Icon />
      <LinkPreview target="_blank" href={link?.toString()}>
        {link && link.length > 20 ? link?.substring(0, 20) + '...' : link}
      </LinkPreview>
    </Container>
  );
};

export default Preview;
