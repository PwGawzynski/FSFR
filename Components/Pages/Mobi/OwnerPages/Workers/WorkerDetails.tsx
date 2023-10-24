import { SafeAreaView, Text, View } from 'react-native';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OwnerWorkersStackProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';
import {
  WorkerPosition,
  WorkerStatus,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getFontScaledSize } from '../../../../../helpers/style/fontSize';
import { SquaredProfilePicture } from '../../../../Molecules/SquaredProfilePicture';
import { CallAndCreateEmailButtons } from '../../../../Molecules/CallAndCreateEmailButtons';

export function WorkerDetails({
  route,
}: OwnerWorkersStackProps<'workerDetails', 'workers'>) {
  const { worker } = route.params;
  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 mr-4 ml-4 flex flex-col">
        <ScreenTitleHeader variant="lg" abs="mt-4">
          Worker {worker.name}
        </ScreenTitleHeader>
        <SquaredProfilePicture imageLink={worker.photoUrl} />
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{ fontSize: getFontScaledSize(18) }}
          className="mt-6 uppercase"
        >
          worker&apos;s information
        </Text>
        <TitleValueInfoComponent
          titles={[
            'id',
            'name',
            'surname',
            'position',
            'Status',
            'dateOfBirth',
            'address',
            'dateOfEmployment',
            'province',
            'county',
          ]}
          keys={[
            worker.id.split('-')[worker.id.split('-').length - 1],
            worker.name,
            worker.surname,
            WorkerPosition[worker.position],
            <Text
              key={Math.random()}
              className={`${
                worker.status === WorkerStatus.Suspended
                  ? 'text-[#f00]'
                  : 'text-[#279840]'
              }`}
            >
              {WorkerStatus[worker.status]}
            </Text>,
            worker.dateOfBirth,
            worker.address,
            worker.dateOfEmployment,
            worker.province,
            worker.county,
          ]}
        />
        <CallAndCreateEmailButtons
          phoneNumber={worker.phone}
          emailOptions={{
            body: 'Send from FarmService T.M',
            recipients: [worker.email],
          }}
        />
      </View>
    </SafeAreaView>
  );
}
