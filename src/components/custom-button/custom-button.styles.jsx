import styled, { css } from 'styled-components';

const disabledButtonStyles = css`
  background-color: gray;
  color: black;
  border: none;
  cursor: default;
`;

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;
  border: 1px solid black;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const googleSignInStyles = css`
  min-width: 80px;
  background-color: white;
  justify-content: center;

  &:hover {
    background-color: black;
  }
`;

const saveButtonStyles = css`
  background-color: green;
  color: white;

  &:hover {
    color: black;
  }
`;

const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }
  if (props.isDisabled) {
    return disabledButtonStyles;
  }
  if (props.save) {
    return saveButtonStyles;
  }
  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid black;

  transition: 0.1s ease-in;

  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;

  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;
