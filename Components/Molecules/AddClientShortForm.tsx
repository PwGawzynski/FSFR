import React from 'react';
import { AppInput } from './AppInput';
import { AddClientShortFormProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function AddClientShortForm({
  newClient,
  setNewClient,
}: AddClientShortFormProps) {
  return (
    <>
      <AppInput
        setter={setNewClient}
        ObjectKey="name"
        value={newClient.name}
        underlyingLabel="Name"
        additionalStyles="flex-1 justify-end "
      />
      <AppInput
        setter={setNewClient}
        ObjectKey="phoneNumber"
        value={newClient.phoneNumber}
        keyboardType="phone-pad"
        underlyingLabel="Phone Number"
        additionalStyles="flex-1 justify-end "
      />
      <AppInput
        setter={setNewClient}
        ObjectKey="email"
        value={newClient.email}
        underlyingLabel="Email"
        additionalStyles="flex-1 justify-end "
      />
    </>
  );
}
