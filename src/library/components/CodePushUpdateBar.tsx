import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types'
import React from 'react'
import { Text, View } from 'react-native'
import ProgressBar from './ProgressBar'

interface CodePushUpdateBar extends IViewProps {
  progress: number
}

function CodePushUpdateBar<CodePushUpdateBar>({ progress = 0, ...rest }) {
  const percentage = Math.floor(progress)

  return (
    <View {...rest}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 12,
          marginBottom: 4,
        }}
      >{`Loading App (${percentage}%)`}</Text>
      <View style={{ flexDirection: 'row' }}>
        <ProgressBar
          progress={progress * 0.01}
          bgColor={'#c2c2c2'}
          color="#fab617"
        />
      </View>
    </View>
  )
}

export default CodePushUpdateBar
