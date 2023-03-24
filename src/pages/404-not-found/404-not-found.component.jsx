import React from 'react';
import styled from 'styled-components';

import Flag from '../../assets/error_flag.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: f1_3;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  font-family: f1_2;
`;

const Emoji = styled.span`
  font-size: 10rem;
`;

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Subtitle>404 Page Not Found</Subtitle>
      <Emoji>
        <img src={Flag} />
      </Emoji>
    </Wrapper>
  );
};

export default NotFoundPage;
