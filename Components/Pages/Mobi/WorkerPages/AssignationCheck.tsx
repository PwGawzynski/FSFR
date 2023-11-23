import { SafeAreaView, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useQuery } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { MessageEvent } from 'react-native-event-source';
import { getWorker } from '../../../../helpers/api/Services/Worker';
import { AppSettings } from '../../../../helpers/appSettings/contexts';
import { Api } from '../../../../helpers/api/Api';
import { PersonalDataBase } from '../../../../FarmServiceTypes/UserPersonalData/Responses';
import { AppearingText } from '../../../Molecules/AppearingText';
import { WorkerRootStackProps } from '../../../../FrontendSelfTypes/navigation/types';

export function AssignationCheck({
  navigation,
}: WorkerRootStackProps<'assignationCheck'>) {
  const { currentUser } = useContext(AppSettings).settings;
  const { data } = useQuery(`myId${currentUser?.email}`, getWorker, {
    refetchOnMount: 'always',
  });
  const [workersCompanyId, setWorkersCompanyId] = useState<
    undefined | PersonalDataBase
  >(undefined);
  const [sseOpen, setSseOpen] = useState(false);
  const handleOpenSse = (event: MessageEvent) => {
    setSseOpen(true);
  };
  const handleErrorSse = (event: MessageEvent) => console.log(event, 'testER');
  const handleMessageSse = (message: MessageEvent) => {
    if (message.data) {
      console.log(message.data);
      const res = JSON.parse(message.data) as PersonalDataBase;
      setWorkersCompanyId(res);
    }
  };

  const handleAnimationEnd = () =>
    navigation.navigate('desktop', { root: { materialDesktop: undefined } });

  useEffect(() => {
    if (data && !workersCompanyId) {
      Api.workerAssignedListener(data.id, {
        open: handleOpenSse,
        error: handleErrorSse,
        message: handleMessageSse,
      });
    }
  }, [data, workersCompanyId]);
  return (
    <SafeAreaView className="w-full h-full flex flex-col">
      <View className="ml-4 mr-4 flex-1 flex flex-col">
        <View className="flex-col flex-1 items-center justify-center">
          {!data?.companyId && sseOpen && !workersCompanyId && (
            <View className="flex-1 flex-col justify-center items-center">
              <View className="w-[200] h-[200] flex-col items-center justify-center">
                <QRCode size={200} color="#279840" value={data?.id} />
              </View>
              <View className="flex-col items-center justify-center">
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  className="mt-16 text-[#848484]"
                >
                  * To connect your account with company
                </Text>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  className="text-[#848484]"
                >
                  Please scan the code
                </Text>
              </View>
            </View>
          )}
          <View className="flex-1 flex-col items-center justify-center">
            <View className="w-full h-24">
              {workersCompanyId && (
                <AppearingText
                  onAnimationEnd={handleAnimationEnd}
                >{`Welcome on board ${workersCompanyId.name}`}</AppearingText>
              )}
            </View>
          </View>
        </View>
        {!sseOpen && (
          <View className="flex-1 flex-col items-center justify-center">
            <ActivityIndicator size={40} color="#279840" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
