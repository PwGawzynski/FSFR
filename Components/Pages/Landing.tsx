import { SafeAreaView, View } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { AppearingText } from '../Molecules/AppearingText';
import { me } from '../../helpers/api/Services/User';
import { myCompany } from '../../helpers/api/Services/Company';
import { OwnerMobiDesktopRootStackProps } from '../../FrontendSelfTypes/navigation/types';

export function Landing({
  navigation,
}: OwnerMobiDesktopRootStackProps<'Landing'>) {
  const { data } = useQuery('me', me);
  const { data: company, error, isSuccess } = useQuery('myCompany', myCompany);
  if (error instanceof AxiosError && error.code === 'ERR_BAD_REQUEST') {
    if (error?.response?.data.payload.message === "Causer don't have company")
      navigation.navigate('CreateCompany');
  }
  useEffect(() => {
    if (company && isSuccess) navigation.navigate('desktop');
  }, [company, isSuccess]);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mr-4 ml-4 justify-center">
        <AppearingText>{`Welcome on board ${data?.name}`}</AppearingText>
      </View>
    </SafeAreaView>
  );
}
