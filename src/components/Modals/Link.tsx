import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { usePopup } from "../../hooks";
import { insertLink, removePopup, validURL } from "../../utils";
import { Modal } from "../Common";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 15px;
  background: white;
  color: black;
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  &:disabled {
    border: 1px solid rgba(0, 0, 0, 0.07);
    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }
`;
const Label = styled.p`
  margin: 0px;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
`;

interface LinkProps {
  range: Range | null | undefined;
}

export const Link: React.FC<LinkProps> = ({ range }) => {
  const wrapperRef = useRef(null);
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  usePopup(wrapperRef, "link-modal", () => {
    setText("");
    setLink("");
  });

  useEffect(() => {
    if (range) setText(range.toString());
  }, [range]);

  return (
    <Modal
      wrapperRef={wrapperRef}
      element="link-modal"
      title="Insert Link"
      cancelAction={() => {
        removePopup("link-modal");
        setText("");
        setLink("");
      }}
      nextAction={(e) => {
        if (!range) removePopup("link-modal");
        insertLink(range, link);
        insertLink(range, link, text);
        setLink("");
        removePopup("link-modal");
      }}
      nextConditions={
        link.trim().length < 1 || !validURL(link) || text.trim().length < 1
      }
    >
      <Label>Enter text</Label>
      <Input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        autoFocus={true}
        placeholder="My Portfolio"
      />

      <Label>Enter link</Label>
      <Input
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
        autoFocus={true}
        placeholder="eg. https://www.imgur.com/example"
      />
    </Modal>
  );
};
