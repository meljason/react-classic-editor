import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { usePopup } from '../../hooks';
import { removePopup } from '../../utils';
import { Modal } from '../Common';

const ImageButton = styled.label`
  background: #2575fc;
  color: white;
  border: 0px;
  padding: 10px;
  display: block;
  width: fit-content;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;

  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
  &:hover {
    background: #1e6ded;
  };
`
const ImageInput = styled.input`
  display: none;
`
const LinkInsert = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  margin-bottom: 15px;
  background: white;
  color: black;
  &::placeholder {
    color: rgba(0,0,0,0.5);
  };
  &:disabled {
    border: 1px solid rgba(0,0,0,0.07);
    &::placeholder {
      color: rgba(0,0,0,0.2);
    };
  }
`
const Label = styled.p`
  margin: 0px;
  margin-top: 15px;
  margin-bottom: 5px;
  color: rgba(0,0,0,0.8);
  font-size: 12px;
`
const NewFileName = styled.p`
  font-size: 14px;
  margin: 0px;
  margin: auto 0;
`
const NewFileContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Remove = styled.button`
  color: #EF4A40;
  background: rgba(239, 74, 64, 0.09);
  border: 0px;
  padding: 10px 20px;
  margin-left: 5px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: rgba(239, 74, 64, 0.12);
  }
`

interface ImageProps {
  range: Range | null | undefined;
}

export const Image: React.FC<ImageProps> = ({ range }) => {
  const wrapperRef = useRef(null);
  const [ files, setFiles ] = useState<FileList | null>(null)
  const [ imageLink, setImageLink ] = useState<string>("")
  usePopup(wrapperRef, 'image-modal', () => {
    setImageLink("")
    setFiles(null)
  });

  const insertImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if ((files && files[0].name.length < 1) && imageLink.trim.length < 1) {
      removePopup('image-modal')
      return
    }

    const editor = document.getElementById('editor')
    let myfile

    if (!editor) return
    if (!range) editor.focus()

    const isBrowse = files && files[0] && files[0].name.length > 0
    if (isBrowse && files) {
      myfile = URL.createObjectURL(files[0]);
    } else {
      myfile = imageLink;
    }

    const img = document.createElement("img")
    img.style.maxWidth = '100%'
    img.style.cursor = 'pointer'
    img.style.border = '4px solid white'
    img.src = myfile

    removePopup('image-modal')
    setImageLink("")

    if (range) {
      range.insertNode(img)
      editor.focus()
      return
    }

    editor.append(img)
  }
  
  return (
    <Modal
      wrapperRef={wrapperRef}
      element="image-modal"
      title="Insert Image"
      cancelAction={() => {
        removePopup("image-modal");
        setImageLink("");
        setFiles(null);
      }}
      nextAction={(e) => insertImage(e)}
    >
      <ImageButton htmlFor="image-input">BROWSE</ImageButton>
      <ImageInput
        onChange={(e) => setFiles(e.target.files)}
        type="file"
        id="image-input"
      />

      {files && files[0] && (
        <NewFileContainer>
          <NewFileName>
            {files[0].name.length > 40
              ? files[0].name.substring(0, 40) + "..."
              : files[0].name}
          </NewFileName>
          <Remove onClick={() => setFiles(null)}>Delete</Remove>
        </NewFileContainer>
      )}

      <Label>Enter Image URL</Label>
      <LinkInsert
        disabled={!!(files && files[0].name.length > 0)}
        value={imageLink}
        onChange={(e) => setImageLink(e.target.value)}
        placeholder="eg. https://www.imgur.com/example"
      />
    </Modal>
  );
}
