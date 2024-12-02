import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextButton} from 'library/components/Button';
import images from 'res/images';

const HomeScreen = ({navigation}) => {
  const onPressLearn = () => {
    navigation.navigate('Learn');
  };

  const onPressPlay = () => {
    navigation.navigate('Level');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={images.background3}
        resizeMode="cover"
        style={{flex: 1}}>
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              marginBottom: -10,
              zIndex: 2,
              marginLeft: 70,
            }}>
            <Image
              style={{
                width: 110,
                height: 90,
              }}
              resizeMode="contain"
              source={images.bird}
            />
          </View>
          <TextButton onPress={onPressLearn}>Let's Learn</TextButton>
          <TextButton style={{marginTop: 20}} onPress={onPressPlay}>
            Let's Play
          </TextButton>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default HomeScreen;
