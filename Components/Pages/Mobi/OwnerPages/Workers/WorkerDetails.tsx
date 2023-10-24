import { Image, SafeAreaView, Text, View } from 'react-native';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OwnerWorkersStackProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';
import { WorkerPosition } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getFontScaledSize } from '../../../../../helpers/style/fontSize';
import { SquaredProfilePicture } from '../../../../Molecules/SquaredProfilePicture';

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
          titles={['id', 'name', 'surname', 'position']}
          keys={[
            worker.id.split('-')[worker.id.split('-').length - 1],
            worker.name,
            worker.surname,
            WorkerPosition[worker.position],
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
