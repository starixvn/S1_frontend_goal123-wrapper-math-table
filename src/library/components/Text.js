import React from 'react';
import {Text as NativeText, StyleSheet} from 'react-native';

export const Text = (props) => {
  return (
    <NativeText
      {...props}
      style={[
        {
          fontFamily: 'ArialRoundedMTBold',
          fontWeight: 'bold',
        },
        props.style,
      ]}>
      {props.children}
    </NativeText>
  );
};
