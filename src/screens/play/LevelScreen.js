import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'library/components/Text';
import MULTIPLICATION_TABLE from 'res/multiplication-table';
import {BackButton, IconButton, TextButton} from 'library/components/Button';
import {Colors} from 'react-native-ui-lib';
import {SafeAreaView} from 'react-native-safe-area-context';

const LEVELS = [
  {difficulty: 1, label: 'Easy'},
  {difficulty: 2, label: 'Medium'},
  {difficulty: 3, label: 'Hard'},
];

const LevelScreen = ({navigation}) => {
  const [selectedTables, setSelectedTables] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);

  useEffect(() => {
    let tablesObj = {};
    Object.keys(MULTIPLICATION_TABLE).map(key => {
      tablesObj[key] = true;
    });

    setSelectedTables(tablesObj);
  }, []);

  const onPressNumber = key => {
    let tablesObj = {...selectedTables};
    tablesObj[key] = !tablesObj[key];

    setSelectedTables(tablesObj);
  };

  const onPressLevel = level => {
    setSelectedDifficulty(level);
  };

  const onPressPlay = () => {
    let tables = Object.keys(MULTIPLICATION_TABLE).filter(
      key => selectedTables[key],
    );

    navigation.navigate('Play', {tables, difficulty: selectedDifficulty});
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.yellow70}}>
      <SafeAreaView style={{flex: 1}}>
        <BackButton onPress={navigation.goBack} />
        <FlatList
          data={Object.keys(MULTIPLICATION_TABLE)}
          numColumns={3}
          keyExtractor={item => item}
          style={{flex: 1}}
          contentContainerStyle={{
            justifyContent: 'center',
            padding: 20,
            alignItems: 'center',
            flexGrow: 1,
          }}
          ListHeaderComponent={
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text>Difficulty:</Text>
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                {LEVELS.map(level => (
                  <TextButton
                    style={[
                      level.difficulty == selectedDifficulty && {
                        backgroundColor: Colors.getColorTint(
                          Colors.yellow50,
                          50,
                        ),
                        shadowOffset: {width: 0, height: 3},
                      },
                      {
                        margin: 6,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                      },
                    ]}
                    textStyle={{fontSize: 20}}
                    onPress={() => onPressLevel(level.difficulty)}>
                    {level.label}
                  </TextButton>
                ))}
              </View>
              <Text style={{marginTop: 20}}>Include Tables:</Text>
            </View>
          }
          renderItem={({item}) => {
            return (
              <View style={{position: 'relative'}}>
                <TextButton
                  style={{
                    margin: 10,
                    minWidth: 90,
                    alignItems: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                  }}
                  onPress={() => onPressNumber(item)}>
                  {item}
                </TextButton>
                {selectedTables[item] && (
                  <View
                    pointerEvents="none"
                    style={{
                      position: 'absolute',
                      bottom: -10,
                      right: -5,
                    }}>
                    <Icon name="check" size={45} color={Colors.green30} />
                  </View>
                )}
              </View>
            );
          }}
          ListFooterComponent={
            <IconButton
              style={{marginTop: 20}}
              icon="play-circle"
              onPress={onPressPlay}>
              Start
            </IconButton>
          }
        />
      </SafeAreaView>
    </View>
  );
};
export default LevelScreen;
