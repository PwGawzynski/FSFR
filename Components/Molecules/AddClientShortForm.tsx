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
        abs="flex-1 justify-end "
      />
      <AppInput
        setter={setNewClient}
        ObjectKey="phoneNumber"
        value={newClient.phoneNumber}
        keyboardType="phone-pad"
        underlyingLabel="Phone Number"
        abs="flex-1 justify-end "
      />
      <AppInput
        setter={setNewClient}
        ObjectKey="email"
        value={newClient.email}
        underlyingLabel="Email"
        abs="flex-1 justify-end "
      />
    </>
  );
}
