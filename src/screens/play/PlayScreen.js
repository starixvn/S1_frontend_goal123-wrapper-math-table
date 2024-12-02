import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Animated, Dimensions} from 'react-native';
import {Text} from 'library/components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native-gesture-handler';
import {BackButton, TextButton} from 'library/components/Button';
import {Colors} from 'react-native-ui-lib';
import images from 'res/images';
import {SafeAreaView} from 'react-native-safe-area-context';

const COUNTDOWN_TIME = {
  1: 15,
  2: 10,
  3: 5,
};

const INPUT_BUTTONS = [
  {key: '1', char: '1'},
  {key: '2', char: '2'},
  {key: '3', char: '3'},
  {key: '4', char: '4'},
  {key: '5', char: '5'},
  {key: '6', char: '6'},
  {key: '7', char: '7'},
  {key: '8', char: '8'},
  {key: '9', char: '9'},
  {key: 'DEL', char: <Icon name="trash" size={26} color={Colors.red30} />},
  {key: '0', char: '0'},
  {
    key: 'ENT',
    char: <Icon name="arrow-right" size={26} color={Colors.green30} />,
  },
];

const PlayScreen = ({route, navigation}) => {
  const [orientation, setOrientation] = useState('PORTRAIT');
  const {tables, difficulty} = route.params || [];

  const [score, setScore] = useState(0);
  const [livesRemaining, setLivesRemaining] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(
    COUNTDOWN_TIME[difficulty],
  );
  const [equation, setEquation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [correctFade, setCorrectFade] = useState(new Animated.Value(0));
  const [wrongFade, setWrongFade] = useState(new Animated.Value(0));

  useEffect(() => {
    listenToOrientation();
    generateEquation();

    // start timer
    console.log(`initializing interval`);
    const interval = setInterval(() => {
      setTimeRemaining(time => time - 1);
    }, 1000);

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, []);

  const listenToOrientation = () => {
    const window = Dimensions.get('window');

    if (window.width < window.height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }

    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  };

  useEffect(() => {
    console.log(`set remaining to 15s`);
    setTimeRemaining(COUNTDOWN_TIME[difficulty]);
  }, [equation]);

  useEffect(() => {
    if (timeRemaining == 0) {
      setLivesRemaining(livesRemaining - 1);
      setWrongFade(new Animated.Value(1));
      generateEquation();
    }
  }, [timeRemaining]);

  useEffect(() => {
    correctFadeOut();
  }, [correctFade]);

  useEffect(() => {
    wrongFadeOut();
  }, [wrongFade]);

  const generateEquation = () => {
    let leftNumIndex = Math.floor(Math.random() * tables.length);
    let rightNum = Math.floor(Math.random() * 12 + 1);
    setEquation([tables[leftNumIndex], rightNum]);
  };

  useEffect(() => {
    if (!livesRemaining) {
      navigation.replace('Score', {score});
    }
  }, [livesRemaining]);

  //   useEffect(() => {
  //     if (!livesRemaining) {
  //       navigation.replace('Score', {score});
  //     }
  //   }, [livesRemaining]);

  const onPressButton = key => {
    if (key == 'DEL') {
      if (userInput.length >= 1) {
        setUserInput(userInput.slice(0, -1));
      }
    } else if (key == 'ENT') {
      if (userInput.length > 0) {
        evaluateUserAns();
      }
    } else if (key == '0' && userInput.length == 0) {
      return;
    } else {
      setUserInput(userInput + key);
    }
  };

  const evaluateUserAns = () => {
    let correctAns = equation[0] * equation[1];
    let userAns = userInput;

    if (userAns == correctAns) {
      //add score, reset timer
      setScore(score + 1);
      setUserInput('');
      generateEquation();
      setCorrectFade(new Animated.Value(1));
    } else {
      //minus 1 live, reset timer
      setLivesRemaining(livesRemaining - 1);
      setTimeRemaining(COUNTDOWN_TIME[difficulty]);
      setUserInput('');
      setWrongFade(new Animated.Value(1));
    }
  };

  const correctFadeOut = () => {
    Animated.timing(correctFade, {
      toValue: 0,
      duration: 1500,
    }).start();
  };

  const wrongFadeOut = () => {
    Animated.timing(wrongFade, {
      toValue: 0,
      duration: 1500,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={images.background3}
        resizeMode="cover"
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <BackButton onPress={navigation.goBack} />
          <View
            style={{
              flex: 1,
              flexDirection: orientation == 'PORTRAIT' ? 'column' : 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: orientation == 'PORTRAIT' ? '100%' : '40%',
              }}>
              <View style={{alignItems: 'center'}}>
                <View>
                  <Text style={{color: Colors.grey30}}>
                    Time Remaining: <Icon name="clock-o" /> {timeRemaining}s
                  </Text>
                </View>
                <View>
                  <Text style={{color: Colors.grey30}}>Score: {score}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {[...Array(livesRemaining)].map(() => (
                    <Icon
                      name="heart"
                      size={30}
                      color={Colors.red20}
                      style={{margin: 5}}
                    />
                  ))}
                </View>
              </View>
              <View
                style={{
                  paddingTop: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View>
                    <Text style={{fontSize: 30}}>
                      {equation[0]} x {equation[1]} = ...
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      padding: 15,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: Colors.blue70,
                      width: '70%',
                      minHeight: 75,
                      alignItems: 'center',
                      margin: 7,
                      position: 'relative',
                    }}>
                    <Text style={{fontSize: 30}} numberOfLines={1}>
                      {userInput}
                    </Text>
                    <Animated.View
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        opacity: correctFade,
                      }}>
                      <Icon
                        style={{marginLeft: 10}}
                        name="check"
                        size={60}
                        color={Colors.green20}
                      />
                    </Animated.View>
                    <Animated.View
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        opacity: wrongFade,
                      }}>
                      <Icon
                        style={{marginLeft: 10}}
                        name="times"
                        size={60}
                        color={Colors.red20}
                      />
                    </Animated.View>
                  </View>
                </View>
              </View>
            </View>
            <FlatList
              style={{flexGrow: 0}}
              data={INPUT_BUTTONS}
              numColumns={3}
              keyExtractor={item => item.key}
              contentContainerStyle={{alignItems: 'center'}}
              scrollEnabled={false}
              renderItem={({item}) => {
                return (
                  <TextButton
                    style={{
                      margin: 10,
                      minWidth: 70,
                      alignItems: 'center',
                      paddingVertical: orientation == 'PORTRAIT' ? 20 : 10,
                    }}
                    onPress={() => onPressButton(item.key)}>
                    {item.char}
                  </TextButton>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default PlayScreen;
