import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = React.forwardRef(
  ({ children, enabled, ...props }, ref) => {
    return (
      <CustomButtonContainer
        styles={{
          backgroundColor: enabled ? 'gray' : 'black',
        }}
        {...props}
        ref={ref}
      >
        {children}
      </CustomButtonContainer>
    );
  }
);

export default CustomButton;
