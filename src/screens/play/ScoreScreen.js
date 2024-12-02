import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {TextButton} from 'library/components/Button';
import images from 'res/images';

const ScoreScreen = ({route, navigation}) => {
  const {score} = route.params || [];

  const onPressAgain = () => {
    navigation.navigate('Level');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.yellow70,
      }}>
      <ImageBackground
        source={images.shape}
        style={{width: '100%'}}
        resizeMode="contain">
        <View
          style={{
            paddingVertical: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18}}>Score</Text>
          <Text style={{fontSize: 80}}>{score}</Text>
        </View>
      </ImageBackground>
      <TextButton onPress={onPressAgain}>Play Again</TextButton>
    </View>
  );
};
export default ScoreScreen;
