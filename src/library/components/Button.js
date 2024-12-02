import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewPropTypes,
} from 'react-native';
import {Text} from 'library/components/Text';
import {Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

export const TextButton = props => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          paddingHorizontal: 30,
          paddingVertical: 20,
          backgroundColor: Colors.white,
          borderRadius: 99,
          shadowOffset: {width: 0, height: 8},
          shadowColor: Colors.getColorTint(Colors.blue10, 80),
          shadowOpacity: 1,
          shadowRadius: 0,
        },
        props.style,
      ]}>
      <Text style={[{fontSize: 26}, props.textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export const IconButton = props => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          paddingLeft: 30,
          paddingRight: 15,
          paddingVertical: 8,
          backgroundColor: Colors.white,
          borderRadius: 99,
          shadowOffset: {width: 0, height: 8},
          shadowColor: Colors.getColorTint(Colors.blue10, 80),
          shadowOpacity: 1,
          shadowRadius: 0,
        },
        props.style,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[{fontSize: 26}, props.textStyle]}>{props.children}</Text>
        <Icon
          style={{marginLeft: 10}}
          name={props.icon}
          size={60}
          color={Colors.red20}
        />
      </View>
    </TouchableOpacity>
  );
};

export const BackButton = props => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          padding: 10,
          width: 100,
        },
        props.style,
      ]}>
      <Icon
        style={{marginLeft: 10}}
        name="chevron-left"
        size={30}
        color={Colors.green30}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
