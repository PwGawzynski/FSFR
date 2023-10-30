import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { FlashList } from '@shopify/flash-list';
import {
  NotificationI,
  NotificationItem,
  NotificationsProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllNotifications } from '../../helpers/api/Services/NotificationsService';
import { Notification } from '../Molecules/Notification';

export function Notifications({ filterOptions }: NotificationsProps) {
  const [data, setData] = useState<Array<NotificationI> | undefined>();
  const { data: notifications, isSuccess } = useQuery(
    'ownerAllNotifications',
    getAllNotifications,
  );

  useEffect(() => {
    if (notifications)
      setData([
        ...notifications.filter(
          e =>
            (e.eventType === 0 && filterOptions.firstOptionState) ||
            (e.eventType === 1 && filterOptions.secondOptionState) ||
            (e.eventType === 2 && filterOptions.thirdOptionState),
        ),
      ]);
  }, [notifications, filterOptions]);
  useEffect(() => setData(notifications), [isSuccess]);

  const SingleNotification = useCallback(
    ({ item }: NotificationItem) => (
      <Notification
        id={item.id}
        causer={item.causer}
        causerRole={item.causerRole}
        message={item.message}
        rightBottomSign={item.rightBottomSign}
        eventType={item.eventType}
      />
    ),
    [],
  );

  return useMemo(
    () => (
      <FlashList
        contentContainerStyle={{ paddingTop: 30 }}
        onLoad={info =>
          // eslint-disable-next-line no-console
          console.log(
            'Desktop Root notifications List has been rendered in: ',
            info.elapsedTimeInMs,
          )
        }
        keyExtractor={item => item.id}
        renderItem={SingleNotification}
        data={data}
        estimatedItemSize={120}
      />
    ),
    [data],
  );
}
