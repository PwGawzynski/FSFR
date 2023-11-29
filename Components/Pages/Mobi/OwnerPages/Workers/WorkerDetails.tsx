import { SafeAreaView, Text, View } from 'react-native';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OwnerWorkersStackProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';
import { WorkerStatus } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getFontScaledSize } from '../../../../../helpers/style/fontSize';
import { CallAndCreateEmailButtons } from '../../../../Molecules/CallAndCreateEmailButtons';
import { Position, Status } from '../../../../../FarmServiceTypes/Worker/Enums';

export function WorkerDetails({
  route,
}: OwnerWorkersStackProps<'workerDetails', 'workers'>) {
  const { worker } = route.params;
  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 mr-4 ml-4 flex flex-col">
        <ScreenTitleHeader variant="lg" abs="mt-4">
          Worker {worker.personalData.name}
        </ScreenTitleHeader>
        {/* <SquaredProfilePicture imageLink={worker.photoUrl} /> */}
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
            'voivodeship',
            'county',
            'city',
            'street',
            'house number',
            'postal code',
          ]}
          keys={[
            worker.id.split('-')[worker.id.split('-').length - 1],
            worker.personalData.name,
            worker.personalData.surname,
            worker.position ? Position[worker.position] : undefined,
            <Text
              key={Math.random()}
              className={`${
                worker.status === Status.Suspended
                  ? 'text-[#f00]'
                  : 'text-[#279840]'
              }`}
            >
              {worker.status ? WorkerStatus[worker.status] : undefined}
            </Text>,
            worker.address.voivodeship,
            worker.address.county,
            worker.address.city,
            worker.address.street,
            worker.address.houseNumber,
            worker.address.postalCode,
          ]}
        />
        <CallAndCreateEmailButtons
          phoneNumber={worker.personalData.phoneNumber}
          emailOptions={{
            body: 'Send from FarmService T.M',
            recipients: [worker.email],
          }}
        />
      </View>
    </SafeAreaView>
  );
}
