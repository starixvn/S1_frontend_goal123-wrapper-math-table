import React from 'react';
import {View, FlatList, Image} from 'react-native';
import {Text} from 'library/components/Text';
import {Colors} from 'react-native-ui-lib';
import {BackButton} from 'library/components/Button';
import images from 'res/images';
import {SafeAreaView} from 'react-native-safe-area-context';

const TableScreen = ({route, navigation}) => {
  const {tableIndex} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: Colors.yellow70}}>
      <SafeAreaView style={{flex: 1}}>
        {/* {Object.keys(MULTIPLICATION_TABLE[tableIndex]).map((key, index) => (
        <TouchableOpacity>
          <Text>{key}</Text>
        </TouchableOpacity>
      ))} */}
        <View
          style={{
            marginBottom: -39,
            zIndex: 2,
            paddingRight: 70,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'flex-start', flex: 1}}>
            <BackButton onPress={navigation.goBack} />
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 50}}>{tableIndex} x</Text>
            </View>
          </View>
          <Image
            style={{height: 140}}
            resizeMode="contain"
            source={images.giraffe}
          />
        </View>
        <View
          style={{
            flex: 1,
            margin: 20,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 10,
            backgroundColor: Colors.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 5,
          }}>
          <FlatList
            contentContainerStyle={{padding: 15}}
            data={Array.from({length: 12}, (_, i) => i + 1)}
            renderItem={({item, index}) => (
              <View
                style={[
                  {
                    paddingHorizontal: 22,
                    paddingVertical: 12,
                    borderRadius: 20,
                    margin: 2,
                  },
                  index % 2 && {
                    backgroundColor: Colors.getColorTint(Colors.orange5, 95),
                  },
                ]}>
                <Text style={{fontSize: 26}}>
                  {`${tableIndex}  x  ${item}  =  ${tableIndex * item}`}
                </Text>
                {/* <Text>
                {MULTIPLICATION_TABLE[tableIndex][item]?.status ?? ''}
              </Text> */}
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default TableScreen;
