import styled from "styled-components";
import React, { useRef } from "react";
import { usePopup } from "../../hooks";
import { ActiveParams, Style } from "../../types";
import Button from "./Button";

const Container = styled.div`
  color: white;
  background: #f9f9f9;
  text-align: center;
  position: absolute;
  display: inline-block;
  width: 280px;
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

interface TooltipParams {
  ac: ActiveParams;
}

export const Tooltip: React.FC<TooltipParams> = ({
  ac: { active, setActive },
}) => {
  const wrapperRef = useRef(null);
  usePopup(wrapperRef, "tooltip");

  const buttons: Style[] = [
    "bold",
    "italic",
    "heading",
    "underline",
    "link",
    "ol",
    "ul",
  ];
  const ac = { active, setActive };

  return (
    <Container ref={wrapperRef} id="tooltip">
      {buttons.map((button, index) => (
        <Button key={index} style={button} ac={ac} />
      ))}
    </Container>
  );
};

export default Tooltip;
