import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Flag from '../../assets/error_flag.png';
import CustomButton from '../../components/custom-button/custom-button.component';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 0px;
  font-family: f1_3;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-family: f1_1;
  margin-bottom: 10px;
`;

const Message = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1.8rem;
  font-family: f1_1;
`;

const Emoji = styled.span`
  font-size: 10rem;
`;

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Subtitle>404 Page Not Found</Subtitle>
      <Message>The page you are looking for is not found!</Message>
      <CustomButton btm>
        <Link to="/" style={{ color: 'white' }}>
          Back to main page
        </Link>
      </CustomButton>
      <Emoji>
        <img src={Flag} style={{ width: '500px' }} />
      </Emoji>
    </Wrapper>
  );
};

export default NotFoundPage;
