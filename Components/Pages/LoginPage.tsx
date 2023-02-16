import { Image, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Login } from '../Organisms/Login';
import { LoginStackParamList } from '../../App';

type Props = StackScreenProps<LoginStackParamList>;
export function LoginPage({ navigation }: Props) {
  return (
    <View className="w-max h-screen bg-white items-center">
      <Image
        resizeMode="cover"
        className="max-w-max h-1/4"
        source={require('../../assets/loginBg.jpg')}
      />
      <Login navigation={navigation} />
    </View>
  );
}
