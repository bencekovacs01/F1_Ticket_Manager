import React from 'react';

// import './custom-button.styles.scss';

import { CustomButtonContainer } from './custom-button.styles';

// const CustomButton = ({
//   children,
//   isGoogleSignIn,
//   inverted,
//   ...otherProps
// }) => (
//   <button
//     className={`${inverted ? 'inverted' : ''} ${
//       isGoogleSignIn ? 'google-sign-in' : ''
//     } custom-button`}
//     {...otherProps}
//   >
//     {children}
//   </button>
// );

const CustomButton = ({ children, enabled, ...props }) => {
  return (
    <CustomButtonContainer
      styles={{
        backgroundColor: enabled ? 'gray' : 'black',
      }}
      title={enabled ? null : 'Please sign in first or register!'}
      {...props}
    >
      {children}
    </CustomButtonContainer>
  );
};

export default CustomButton;
