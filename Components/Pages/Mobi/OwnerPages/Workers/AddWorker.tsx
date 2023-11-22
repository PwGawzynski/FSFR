import { SafeAreaView, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import {
  handleBarCodeScannedData,
  NewWorkerSign,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OwnerWorkersMaterialRootProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { QRScanner } from '../../../../Organisms/QRScanner';
import { addNewWorker } from '../../../../../helpers/api/Services/Worker';
import { AppButton } from '../../../../Atoms/AppButton';
import { AppearingText } from '../../../../Molecules/AppearingText';

export function AddWorker({
  navigation,
}: OwnerWorkersMaterialRootProps<'addWorker', 'workersRoot', 'workers'>) {
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  const {
    mutate: createNewWorker,
    data: worker,
    isLoading: isWorkerMutationLoading,
  } = useMutation(addNewWorker);

  const [profileSign, setProfileSign] = useState<NewWorkerSign | undefined>(
    undefined,
  );

  const handleWorkerAdded = () =>
    worker &&
    navigation.navigate('OperationConfirmed', {
      redirectScreenName: 'materialWorkersRoot',
      shownMessage: `Worker ${worker.personalData.name} ${worker.personalData.surname} Has Been Added`,
    });

  useEffect(() => {
    if (worker) {
      setProfileSign({
        name: worker.personalData.name,
        surname: worker.personalData.surname,
      });
    }
  }, [worker]);

  const handleQrScanned = ({ data }: handleBarCodeScannedData) => {
    setScanned(true);
    createNewWorker({ user: data });
  };
  return (
    <SafeAreaView className="w-full h-full flex flex-col">
      <View className="ml-4 mr-4 flex-1 flex flex-col">
        <View className="flex-row items-center justify-between">
          <ScreenTitleHeader variant="lg">Add New Worker</ScreenTitleHeader>
          {isWorkerMutationLoading && (
            <ActivityIndicator size={32} color="#279840" />
          )}
        </View>
        <View className="flex flex-1 flex-col items-center justify-center">
          <View className="h-48 w-48 mt-6 mb-6 bg-black rounded-lg flex-col items-center justify-center overflow-hidden">
            {isFocused && (
              <QRScanner
                scanned={scanned}
                handleBarCodeScanned={handleQrScanned}
              />
            )}
          </View>
        </View>
        <View className="flex-1 items-center justify-center flex-col">
          {profileSign && (
            <AppearingText
              onAnimationEnd={handleWorkerAdded}
            >{`Added ${profileSign.name} ${profileSign.surname}`}</AppearingText>
          )}
        </View>
        <Text className="mb-8 text-sm text-center text-[#848484] pl-4 pr-4">
          * To add a new employee, scan the QR code that is available when the
          employee first logs ba his account
        </Text>
        <AppButton
          abs="mb-8"
          action={() => setScanned(false)}
          context="Retry"
        />
      </View>
    </SafeAreaView>
  );
}
