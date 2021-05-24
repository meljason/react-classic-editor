import React from "react";
import styled from "styled-components";
import { ActiveParams, Style } from "../../types";
import { defaults, format, getSelection, lists, removePopup } from "../../utils";
import { RenderButton } from "../Common/index";

const ToolTipButton = styled.button<{ active: boolean }>`
  padding: 3px;
  font-size: 14px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: ${(prop) => (prop.active ? "#EDEDED" : "none")};
  color: ${(prop) => (prop.active ? "#77abff" : "#4C4B64")};
  padding-top: 8px;
  border: 0px;
  transition: 0.3s;
  &:hover {
    background: ${(prop) => (prop.active ? "#E8E8E8" : "#EDEDED")};
  };
  &:first-child {
    border-radius: 5px 0px 0px 5px;
  };
  &:last-child {
    border-radius: 0px 5px 5px 0px;
  };
`;

interface ButtonProps {
  ac: ActiveParams;
  style: Style;
}

export const Button: React.FC<ButtonProps> = ({
  ac: { active, setActive },
  style,
}) => {
  return (
    <ToolTipButton
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
        } else if (style === "link") {
          const link = document.getElementById("link-input");
          if (!link) return;
          removePopup("tooltip");
          getSelection("link-insert");
          link?.focus();
        } else if (lists.includes(style)) {
          format(style);
        }
      }}
    >
      <RenderButton style={style} />
    </ToolTipButton>
  );
};

export default Button;
