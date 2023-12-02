import { SafeAreaView, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import { OwnerMobiFieldsTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import {
  getAllFieldsById,
  remField,
} from '../../../../../helpers/api/Services/FieldsService';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';
import { FieldResponseBase } from '../../../../../FarmServiceTypes/Field/Ressponses';
import { AppButton } from '../../../../Atoms/AppButton';
import {
  AppSettings,
  ModalState,
} from '../../../../../helpers/appSettings/contexts';

enum ScreenState {
  Init,
  PreDelete,
}
export function FieldDetails({
  route,
  navigation,
}: OwnerMobiFieldsTopTabProps<'fieldDetails', 'fields'>) {
  const { setModalContext } = useContext(AppSettings).setters;

  const { fieldId } = route.params;
  const { data: field } = useQuery<FieldResponseBase | undefined>(
    ['field', fieldId],
    ({ queryKey }) => getAllFieldsById(`${queryKey[1]}`),
  );
  const { mutate, isSuccess } = useMutation('remField', remField);

  const [screenState, setScreenState] = useState(ScreenState.Init);

  useEffect(() => {
    if (isSuccess)
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'ordersRoot',
        shownMessage: `Field Deleted`,
      });
  }, [isSuccess]);

  useEffect(() => {
    if (screenState === ScreenState.PreDelete && field)
      setModalContext({
        isOn: ModalState.on,
        context: 'Confirm Delete operation !!!',
        onApproveCallback: () => {
          mutate(field.id);
        },
        onDisapproveCallback: () => setScreenState(ScreenState.Init),
        customApproveButtonText: 'Confirm',
        customDisapproveButtonText: 'Regret',
      });
  }, [screenState, field]);

  return (
    <SafeAreaView className="w-full h-full flex-col">
      <View className="flex-1 flex-col mr-4 ml-4 justify-between">
        {field && (
          <TitleValueInfoComponent
            elementAbs="mt-8"
            titles={[
              'Field ID',
              'Field PL_ID',
              'Area',
              'Date of collection data',
              'City',
              'County',
              'Voivodeship',
              'longitude',
              'latitude',
            ]}
            keys={[
              `...${field.id.split('-')[4]}`,
              field.polishSystemId,
              Number.isNaN(Number(field.area))
                ? 0
                : Number(field.area).toFixed(2),
              new Date(field.dateOfCollectionData).toLocaleDateString(),
              field.address.city,
              field.address.county,
              field.address.voivodeship,
              field.address.longitude,
              field.address.latitude,
            ]}
          />
        )}
        {field && (
          <AppButton
            abs="bg-[#f00] mb-8"
            action={() => setScreenState(ScreenState.PreDelete)}
            context="Remove"
          />
        )}
      </View>
    </SafeAreaView>
  );
}
