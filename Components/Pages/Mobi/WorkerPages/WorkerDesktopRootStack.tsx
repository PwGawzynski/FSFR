import { SafeAreaView, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useQuery } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { MessageEvent } from 'react-native-event-source';
import { getWorkerId } from '../../../../helpers/api/Services/Worker';
import { AppSettings } from '../../../../helpers/appSettings/contexts';
import { Api } from '../../../../helpers/api/Api';
import { PersonalDataBase } from '../../../../FarmServiceTypes/UserPersonalData/Responses';
import { AppearingText } from '../../../Molecules/AppearingText';

export function WorkerDesktopRootStack() {
  const { currentUser } = useContext(AppSettings).settings;
  const { data, isLoading } = useQuery(
    `myId${currentUser?.email}`,
    getWorkerId,
    { refetchOnMount: 'always' },
  );
  const [workersCompanyId, setWorkersCompanyId] = useState<
    undefined | PersonalDataBase
  >(undefined);
  const handleOpenSse = (event: MessageEvent) => console.log(event, 'testOp');
  const handleErrorSse = (event: MessageEvent) => console.log(event, 'testER');
  const handleMessageSse = (message: MessageEvent) => {
    if (message.data) {
      console.log(message.data);
      const res = JSON.parse(message.data) as PersonalDataBase;
      setWorkersCompanyId(res);
    }
  };

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
        <View className="flex-col flex-1 items-center justify-center relative">
          <View className="flex-1 flex-col justify-center items-center">
            {isLoading && <ActivityIndicator size={200} />}
            {data?.id && <QRCode size={200} color="#279840" value={data.id} />}
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
          <View className="flex-1 flex-col items-center justify-center">
            <View className="w-full h-24">
              {workersCompanyId && (
                <AppearingText>{`Welcome on board ${workersCompanyId.name}`}</AppearingText>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
