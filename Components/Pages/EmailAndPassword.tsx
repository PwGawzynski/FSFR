import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { EmailAndPasswordForm } from '../Organisms/EmailAndPasswordForm';
import { RegisterStackParamList } from '../../frontendSelfTypes/NavigatorsInterfaces/RegisterStack';
import { EmailAndPasswordData } from '../../../farm-service-be/types/Useer/RegisterDataObject';

type Props = StackScreenProps<RegisterStackParamList, 'EmailAndPassword'>;

export function EmailAndPassword({ navigation, route }: Props) {
  const [data, setData] = useState<EmailAndPasswordData>({
    email: '',
    password: '',
  });
  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <EmailAndPasswordForm
        data={data}
        setData={setData}
        navigation={navigation}
        route={route}
      />
    </View>
  );
}
