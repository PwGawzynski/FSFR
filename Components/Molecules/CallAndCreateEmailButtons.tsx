import * as MailComposer from 'expo-mail-composer';
import * as Linking from 'expo-linking';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { CallAndCreateEmailButtonsProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function CallAndCreateEmailButtons({
  phoneNumber,
  emailOptions,
}: CallAndCreateEmailButtonsProps) {
  const [services, setServices] = useState({
    mailComposer: false,
    phone: false,
  });

  const onSendEmailAction = () => MailComposer.composeAsync(emailOptions);
  const onCallAction = () => Linking.openURL(`tel:+${phoneNumber}`);

  useEffect(() => {
    (async () => {
      if (await MailComposer.isAvailableAsync())
        setServices(prevState => ({
          ...prevState,
          mailComposer: true,
        }));
      if (await Linking.canOpenURL(`tel:+${phoneNumber}`))
        setServices(prevState => ({
          ...prevState,
          phone: true,
        }));
    })();
  }, []);

  return (
    <View className="flex-row flex-1 items-center justify-between">
      {services.mailComposer && (
        <AppButton
          action={onSendEmailAction}
          context="send email"
          abs="flex-1 mr-4"
        />
      )}
      {services.phone && (
        <AppButton
          action={onCallAction}
          context="call"
          abs="flex-1 ml-4 bg-[#279840]"
        />
      )}
    </View>
  );
}
