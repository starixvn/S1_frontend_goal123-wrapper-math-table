import React from 'react';
import {View, ImageBackground, FlatList, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton, TextButton} from 'library/components/Button';
import MULTIPLICATION_TABLE from 'res/multiplication-table';
import images from 'res/images';

const LearnScreen = ({navigation}) => {
  const onPressNumber = key => {
    navigation.navigate('Table', {tableIndex: key});
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={images.background2}
        resizeMode="cover"
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, position: 'relative'}}>
          <BackButton onPress={navigation.goBack} />
          {/* <View
        style={{
          width: '90%',
          alignItems: 'center',
          flex: 1,
          flexWrap: 'wrap',
        }}>
        {Object.keys(MULTIPLICATION_TABLE).map((key, index) => (
          <View
            style={{
              width: '30%',
              flexGrow: 1,
            }}>
            <TextButton onPress={() => onPressNumber(key)}>{key}</TextButton>
          </View>
        ))}
      </View> */}

          {/* <FlatList
        data={Object.keys(MULTIPLICATION_TABLE)}
        numColumns={3}
        // style={{
        //   flex: 1,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // }}
        contentContainerStyle={{alignItems: 'center'}}
        scrollEnabled={false}
        renderItem={({item}) => {
          return (
            <TextButton
              style={{margin: 10, minWidth: 90, alignItems: 'center'}}
              onPress={() => onPressNumber(item)}>
              {item}
            </TextButton>
          );
        }}
      /> */}
          <View>
            <FlatList
              data={Object.keys(MULTIPLICATION_TABLE)}
              numColumns={3}
              keyExtractor={item => item}
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 50,
              }}
              renderItem={({item}) => {
                return (
                  <TextButton
                    style={{
                      margin: 10,
                      minWidth: 90,
                      alignItems: 'center',
                      paddingVertical: 28,
                    }}
                    onPress={() => onPressNumber(item)}>
                    {item}
                  </TextButton>
                );
              }}
            />
          </View>
          <Image
            style={{
              height: 300,
              position: 'absolute',
              bottom: -10,
              zIndex: -2,
            }}
            resizeMode="contain"
            source={images.fox}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default LearnScreen;
