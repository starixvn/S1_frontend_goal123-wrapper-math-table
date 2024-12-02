import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import branch from 'react-native-branch'
import CodePush from 'react-native-code-push'
import images from 'res/images'
import CodePushUpdateBar from '../../library/components/CodePushUpdateBar'
import { isTabletRatio } from '../../utilities/rn-helper'

const SplashScreen = () => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation()
  const [progress, setProgress] = useState(0)
  const [branchChecked, setBranchChecked] = useState(false)
  const { setItem: setGame, getItem: getGame } = useAsyncStorage('@game')
  const downloadingRef = useRef()
  const isGameRef = useRef()

  function onDownloadProgress({ totalBytes, receivedBytes }) {
    setProgress(Math.floor((receivedBytes / totalBytes) * 100))
  }

  async function triggercp(key) {
    try {
      const availableUpdate = await CodePush.checkForUpdate(key)

      if (availableUpdate) {
        downloadingRef.current = true

        const downloadedPackage = await availableUpdate.download(
          onDownloadProgress
        )
        downloadingRef.current = false

        downloadedPackage.install(CodePush.InstallMode.IMMEDIATE)
      } else return true
    } catch (e) {
      console.log('download failed', e)
      Alert.alert(
        'Something went wrong',
        'An error occurred while updating the app! ',
        [{ text: 'Please try again ', onPress: () => triggercp(key) }]
      )
    }
  }

  async function readGame() {
    const isGame = await getGame()
    if (isGame === '1') isGameRef.current = true
  }

  useEffect(() => {
    readGame()

    branch.subscribe(async ({ error, params, uri }) => {
      if (!downloadingRef.current) {
        if (isGameRef.current || (params && params.isGame === 'true')) {
          setGame('1') // Keeping on async storage could maintain after other redux persis took over
          triggercp()
          return
        } else {
          const ready = await triggercp('YIwU-aysvvPLE16ZV7idX8b-v1iyr7KWMqhFh')
          if (ready) {
            setBranchChecked(true)
          }
        }

        if (error) {
          console.error('Error from Branch: ' + error)
          return
        }
      }
    })
  }, [])

  useEffect(() => {
    if (branchChecked) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      )
    }
  }, [branchChecked])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#152032',
      }}
    >
      <Image
        resizeMode="contain"
        source={images.logo}
        style={{ width: 128, height: 128 }}
      />
      {progress > 0 && (
        <CodePushUpdateBar
          progress={progress}
          style={styles.codePush}
          bottom={40}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  codePush: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginHorizontal: isTabletRatio() ? '30%' : '20%',
  },
})

export default SplashScreen
