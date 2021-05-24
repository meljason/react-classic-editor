import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ border: boolean }>`
  padding: 5px 10px;
  border: ${prop => prop.border ? '1px' : '0px'} solid #EBEBEB;
  border-top: 0px;
  font-size: 14px;
  text-align: right;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  color: rgba(0,0,0,0.4);
`

interface CounterProps {
  counter: number;
  border: boolean;
}

export const Counter: React.FC<CounterProps> = ({ counter, border=false }) => {
  return (
    <Container border={border}>
      {counter} {counter === 0 ? 'word' : 'words'}
    </Container>
  );
}