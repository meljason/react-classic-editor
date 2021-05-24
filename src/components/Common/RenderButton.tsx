import React, { Fragment } from 'react'
import {
  FaItalic,
  FaListOl,
  FaHeading,
  FaBold,
  FaUnderline,
  FaListUl,
  FaLink,
  FaImage
} from "react-icons/fa";
import { Style } from '../../types';

interface RenderButtonProps {
  style: Style
}

export const RenderButton: React.FC<RenderButtonProps> = ({ style }) => {
  return (
    <Fragment>
      {style === "bold" ? (
        <FaBold />
      ) : style === "italic" ? (
        <FaItalic />
      ) : style === "heading" ? (
        <FaHeading />
      ) : style === "underline" ? (
        <FaUnderline />
      ) : style === "link" ? (
        <FaLink />
      ) : style === "ol" ? (
        <FaListOl />
      ) : style === "ul" ? (
        <FaListUl />
      ) : style === "image" ? (
        <FaImage />
      ): null}
    </Fragment>
  );
}

export default RenderButton