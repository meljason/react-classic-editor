import React from "react";
import styled from "styled-components";
import { ActiveParams, Style } from "../../types";
import { defaults, format, lists, showPopup } from "../../utils";
import { RenderButton } from "../Common/index";

const ToolbarButton = styled.button<{
  active?: boolean;
}>`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  color: ${(prop) => (prop.active ? "#77abff" : "#4C4B64")};
  background: ${(prop) => (prop.active ? "#EDEDED" : "none")};
  border: 0px;
  margin: auto 0;
  margin-right: 5px;
  transition: 0.3s;
  &:hover {
    background: ${(prop) => (prop.active ? "#E8E8E8" : "#EDEDED")};
  }
  &:last-child {
    margin-right: 0px;
  }
`;

interface ButtonProps {
  font?: "sm" | "md";
  ac: ActiveParams;
  style: Style;
}

export const Button: React.FC<ButtonProps> = ({
  ac: { active, setActive },
  style,
}) => {
  return (
    <ToolbarButton
      active={active[style]}
      onClick={() => {
        if (
          defaults.includes(style) ||
          style === "heading" ||
          lists.includes(style)
        ) {
          const editor = document.getElementById("editor");
          format(style);

          let temp = active;
          temp = { ...active, [style]: !active[style] };
          setActive(temp);
          editor?.focus();
        } else if (style === "image") {
          showPopup("image-modal");
        } else if (style === "link") {
          showPopup("link-modal");
        }
      }}
    >
      <RenderButton style={style} />
    </ToolbarButton>
  );
};

export default Button;
