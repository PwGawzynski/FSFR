import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react';
import { OrLabel } from '../Atoms/OrLabel';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { AddOrderAndClientFormProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { AddOrderForm } from '../Molecules/AddOrderForm';
import { AddClientShortForm } from '../Molecules/AddClientShortForm';

export function AddOrderAndClientForm({
  setNewClient,
  newClient,
  setCanValidateClient,
  setCanValidate,
  newOrder,
  setNewOrder,
  setBtnClicked,
}: AddOrderAndClientFormProps) {
  return (
    <KeyboardAwareScrollView
      className="flex flex-1 grow-[11] flex-col  w-full"
      showsVerticalScrollIndicator={false}
    >
      <AddOrderForm newOrder={newOrder} setNewOrder={setNewOrder} />

      <OrLabel />
      <InfoText abs="text-left text-base font-bold uppercase mt-8">
        Create New Client in Short Way
      </InfoText>

      <AddClientShortForm newClient={newClient} setNewClient={setNewClient} />

      <AppButton
        action={() => {
          if (
            !(
              newClient.name.length ||
              newClient.phoneNumber.length ||
              newClient.email.length
            )
          ) {
            setCanValidate(true);
            setBtnClicked(true);
            return;
          }
          setCanValidateClient(true);
          setBtnClicked(true);
        }}
        context="Create"
        abs="mt-4 mb-8 flex-1"
      />
    </KeyboardAwareScrollView>
  );
}
