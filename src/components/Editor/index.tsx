import Link from '../Link'
import { Toolbar } from '../Toolbar'
import { Tooltip } from '../Tooltip'
import { useEditor } from '../../hooks'
import styled, { createGlobalStyle } from 'styled-components'
import React, { Fragment, useState } from 'react'
import { EditorInterface } from '../../types'
import { mouseCapture, onInput } from '../../utils'
import Preview from '../Link/Preview'
import { Image as ImageModal } from '../Modals/Image'
import { Link as LinkModal } from '../Modals/Link'
import { Counter } from '../Counter'

const TextEditor = styled.div<{
  hasToolbar: boolean;
  showCount: boolean;
  border: boolean;
}>`
  font-size: 16px;
  padding: 20px;
  border: ${prop => prop.border ? '1px' : '0px'} solid #DEDEDE;
  border-bottom-style: ${prop => prop.showCount ? 'dashed' : 'solid'};
  background: white;
  color: black;
  max-width: 100%;
  min-height: 200px;
  resize: vertical;
  overflow: hidden;
  &:focus {
    outline: none;
  };
  &:empty:before {
    content: attr(placeholder);
    color: rgba(0, 0, 0, 0.5);
    box-sizing: inherit;
    cursor: text;
  };
  & > a {
    color: #4f90f2;
  }
`;
const Wrapper = createGlobalStyle`
  html {
    box-sizing: border-box;
  };
  *, *:before, *:after {
    box-sizing: inherit;
  };
  input {
    &:focus {
      outline: none;
    }
  }
`

export const Editor: React.FC<EditorInterface> = ({
  toolbar = true,
  placeholder = "Welcome to your react editor",
  autoFocus = true,
  spellCheck = true,
  showCount = true,
  border = true,
}) => {
  const { editorRef, range, active, setActive } = useEditor(autoFocus);
  const [link, setLink] = useState<string | null>("");
  const [counter, setCounter] = useState<number>(0);
  const ac = { setActive, active };

  const params = {
    id: "editor",
    ref: editorRef,
    border,
    showCount,
    spellCheck,
    hasToolbar: toolbar,
    placeholder,
    contentEditable: true,
    onInput: () => onInput(ac, toolbar, setCounter),
    onMouseUpCapture: () => mouseCapture(ac, toolbar, setLink),
  };

  return (
    <Fragment>
      <Wrapper />
      {!toolbar && <Tooltip ac={ac} />}
      {toolbar && <Toolbar ac={ac} />}
      <ImageModal range={range} />
      <LinkModal range={range} />
      <Link range={range} />
      <Preview link={link} />
      <TextEditor {...params} />
      {showCount && <Counter border={border} counter={counter} />}
    </Fragment>
  );
};
