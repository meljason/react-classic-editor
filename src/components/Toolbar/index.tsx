import React from "react";
import Button from "./Button";
import styled from 'styled-components';
import { ActiveParams, Style } from "../../types";

const Container = styled.div`
  background: #f9f9f9;
  border: 1px solid #dedede;
  border-bottom: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 3px;
  display: flex;
  flex-direction: row;
`

interface ToolbarParams {
  ac: ActiveParams;
}

export const Toolbar: React.FC<ToolbarParams> = ({
  ac: { active, setActive },
}) => {
  const buttons: Style[] = [
    "bold",
    "italic",
    "heading",
    "underline",
    "link",
    "ol",
    "ul",
    "image"
  ];
  const ac = { active, setActive };

  return (
    <Container>
      {buttons.map((button, index) => (
        <Button
          key={index}
          style={button}
          ac={ac}
        />
      ))}
    </Container>
  );
};
