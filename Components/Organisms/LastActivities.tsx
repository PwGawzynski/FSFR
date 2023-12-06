import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { MessageEvent } from 'react-native-event-source';
import { useIsFocused } from '@react-navigation/native';
import { LasActivitiesItem } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Activity } from '../Molecules/Activity';
import { EmptyListInfo } from '../Molecules/EmptyListInfo';
import { Api } from '../../helpers/api/Api';
import { NotificationsResponseBase } from '../../FarmServiceTypes/Notification/Responses';

export function LastActivities() {
  const [notifications, setNotifications] = useState<
    NotificationsResponseBase[] | undefined
  >(undefined);
  const [sseOpen, setSseOpen] = useState<boolean>(false);
  const focused = useIsFocused();
  const handleOpenSse = () => {
    setSseOpen(true);
  };
  const handleErrorSse = (event: MessageEvent) => console.log(event, 'testER');
  const handleMessageSse = (message: MessageEvent) => {
    if (message.data) {
      const res = JSON.parse(message.data) as NotificationsResponseBase[];
      setNotifications(res);
    }
  };

  useEffect(() => {
    return Api.notificationsSse({
      open: handleOpenSse,
      error: handleErrorSse,
      message: handleMessageSse,
    });
  }, [!sseOpen, focused]);

  const ActivityItem = useCallback(
    ({ item }: LasActivitiesItem) => (
      <Activity
        id={item.id}
        shortInfo={item.shortInfo}
        eventType={item.eventType}
        createdAt={item.createdAt}
        causer={item.causer}
        description={item.description}
      />
    ),
    [],
  );

  return useMemo(
    () => (
      <FlashList
        onLoad={info =>
          // eslint-disable-next-line no-console
          console.log(
            'Owner desktop root lastActivities list has been rendered in: ',
            info.elapsedTimeInMs,
          )
        }
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <EmptyListInfo text={`Empty here :( \n Let's get down to work`} />
        }
        renderItem={ActivityItem}
        data={notifications}
        estimatedItemSize={100}
      />
    ),
    [notifications],
  );
}
