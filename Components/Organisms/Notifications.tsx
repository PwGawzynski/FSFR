import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import {
  NotificationI,
  NotificationsProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllNotifications } from '../../helpers/api/Services/NotificationsService';
import { Notification } from '../Molecules/Notification';

export function Notifications({ filterOptions }: NotificationsProps) {
  const [data, setData] = useState<Array<NotificationI> | undefined>();
  const {
    mutate: notificationsMutate,
    data: notifications,
    isSuccess,
  } = useMutation(getAllNotifications);

  useEffect(() => {
    if (!data) notificationsMutate();
  }, [data]);
  useEffect(() => setData(notifications), [isSuccess]);
  return (
    <ScrollView className="flex-1 flex flex-col mt-4 mb-12 pt-8">
      {data &&
        data
          .filter(
            e =>
              (e.eventType === 0 && filterOptions.firstOptionState) ||
              (e.eventType === 1 && filterOptions.secondOptionState) ||
              (e.eventType === 2 && filterOptions.thirdOptionState),
          )
          .map(singleNotification => (
            <Notification
              key={Math.random()}
              causer={singleNotification.causer}
              causerRole={singleNotification.causerRole}
              message={singleNotification.message}
              rightBottomSign={singleNotification.rightBottomSign}
              eventType={singleNotification.eventType}
            />
          ))}
    </ScrollView>
  );
}
