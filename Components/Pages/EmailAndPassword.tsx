import { View } from 'react-native';
import { useState } from 'react';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { EmailAndPasswordForm } from '../Organisms/EmailAndPasswordForm';
import { EmailAndPasswordData } from '../../../farm-service-be/types/Useer/RegisterDataObject';
import { EmailAndPasswordBase } from '../../frontendSelfTypes/navigation/types';

export function EmailAndPassword({ navigation, route }: EmailAndPasswordBase) {
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
