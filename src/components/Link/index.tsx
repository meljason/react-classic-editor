import React, { useRef, useState } from "react";
import styled from "styled-components";
import { usePopup } from "../../hooks";
import { insertLink, removePopup } from "../../utils";

const Container = styled.div`
  background: #F9F9F9;
  width: 240px;
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
const Input = styled.input`
  width: 100%;
  height: 40px;
  background: none;
  border: 0px;
  padding-left: 15px;
  padding-right: 15px;
  color: black;
  font-size: 16px;
  &:focus {
    outline: none;
  };
`
const Form = styled.form`
  display: flex;
  flex-direction: row;
`
const Icon = styled.svg`
  height: 30px;
  width: 30px;
  margin: auto 0;
  margin-right: 6px;
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  padding: 5px;
  transition: 0.1s;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;

interface LinkProps {
  range: Range | null | undefined;
}

export const Link: React.FC<LinkProps> = ({ range }) => {
  const wrapperRef = useRef(null);
  usePopup(wrapperRef, 'link-insert');
  const [ value, setValue ] = useState<string>("")

  return (
    <Container ref={wrapperRef} id="link-insert">
      <Form
        onBlur={() => {
          insertLink(range, value);
          setValue("");
        }}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          insertLink(range, value);
          setValue("");
        }}
      >
        <Input
          id="link-input"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          placeholder="Insert link"
        />

        <Icon
          onClick={() => removePopup('link-insert')}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </Icon>
      </Form>
    </Container>
  );
};

export default Link;
