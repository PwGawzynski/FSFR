import { SafeAreaView, Text, View } from 'react-native';
import { useState } from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { AppInput } from '../../../../Molecules/AppInput';
import {
  NewWorker,
  WorkerPosition,
  WorkerStatus,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getFontScaledSize } from '../../../../../helpers/style/fontSize';

const INIT_WORKER: NewWorker = {
  county: '',
  email: '',
  surname: '',
  name: '',
  phone: '',
  province: '',
  address: '',
  dateOfBirth: '',
  status: WorkerStatus.Active,
  photoUrl: '',
  position: WorkerPosition.Operator,
};

export function AddWorker() {
  const [newWorker, setNewWorker] = useState<NewWorker>(INIT_WORKER);

  return (
    <SafeAreaView className="w-full h-full flex flex-col">
      <View className="ml-4 mr-4 flex-1 flex flex-col justify-between">
        <ScreenTitleHeader variant="lg">Add New Worker</ScreenTitleHeader>
        <View className="flex flex-col items-center justify-center">
          <View className="h-48 w-48 mt-6 mb-6 bg-[#848484] rounded-lg" />
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="text-center font-semibold"
            style={{ width: '100%', fontSize: getFontScaledSize(24) }}
          >
            {newWorker.name} {newWorker.surname}
          </Text>
        </View>
        <View className="flex-1">
          <AppInput
            setter={setNewWorker}
            ObjectKey="name"
            value={newWorker.name}
            underlyingLabel="Name"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="surname"
            value={newWorker.surname}
            underlyingLabel="Surname"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="phone"
            value={newWorker.phone}
            underlyingLabel="Phone"
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
