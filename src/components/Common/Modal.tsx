import React from 'react'
import styled from 'styled-components';
import { Element } from '../../types';

const Poper = styled.div`
  background: white;
  border: 1px solid rgba(0,0,0,0.1);
  position: absolute;
  min-width: 400px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 45%;
  z-index: 999999999999;
  transition: 0.04s;
  border-radius: 4px;

  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.21);
` 
const Title = styled.h3`
  margin: 0px;
  color: rgba(0,0,0,0.4);
  font-weight: 500;
  background: rgba(0,0,0,0.03);
  padding: 10px;
  border-bottom: 1px solid rgba(0,0,0,0.04);
`
const Content = styled.div`
  padding: 10px;
  color: rgba(0,0,0,0.8);
` 
const Container = styled.div`
  background: rgba(0,0,0,0.1);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;

  opacity: 0;
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
`
const ButtonContainer = styled.div`
  display: inline-block;
  float: right;
  padding-bottom: 10px;
  padding-top: 10px;
`
const Insert = styled.button`
  background: #2575fc;
  color: white;
  border: 0px;
  padding: 10px;
  cursor: pointer;
  min-width: 70px;
  border-radius: 4px;
  transition: 0.3s;
  &:hover {
    background: #1e6ded;
  };
  &:disabled {
    cursor: default;
    background: rgba(37, 117, 252, 0.3);
  }
`
const Cancel = styled.button`
  border: 0px;
  padding: 10px;
  margin-right: 8px;
  background: #dddddd;
  color: black;
  cursor: pointer;
  min-width: 70px;
  border-radius: 4px;
  &:hover {
    background: #d3d3d3;
  }
`

interface ModalProps {
  wrapperRef: React.MutableRefObject<null> ;
  element: Element;
  title: string;
  cancelAction: () => void;
  nextAction: (e?: any) => void;
  nextConditions?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  wrapperRef,
  children,
  element,
  title,
  cancelAction,
  nextAction,
  nextConditions = false
}) => {
  return (
    <Container id={element}>
      <Poper ref={wrapperRef}>
        <Title>{title}</Title>
        <Content>
          {children}
          <ButtonContainer>
            <Cancel
              onClick={cancelAction}
            >
              Cancel
            </Cancel>
            <Insert disabled={nextConditions} onClick={nextAction}>Insert</Insert>
          </ButtonContainer>
        </Content>
      </Poper>
    </Container>
  );
};