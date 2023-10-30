import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { FlashList } from '@shopify/flash-list';
import {
  ActivityI,
  LasActivitiesItem,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getLastActivitiesService } from '../../helpers/api/Services/Activities';
import { Activity } from '../Molecules/Activity';
import { EmptyListInfo } from '../Molecules/EmptyListInfo';
import { LoadingAnimation } from '../Atoms/LoadingAnimation';

export function LastActivities() {
  const [data, setData] = useState<Array<ActivityI> | undefined>(undefined);
  const { data: activities, isSuccess } = useQuery(
    'ownerAllActivities',
    getLastActivitiesService,
  );
  useEffect(() => {
    if (activities) setData([...activities]);
  }, [activities]);
  useEffect(() => setData(activities), [isSuccess]);

  const ActivityItem = useCallback(
    ({ item }: LasActivitiesItem) => (
      <Activity
        id={item.id}
        activityLogCauser={item.activityLogCauser}
        activityCauserRole={item.activityCauserRole}
        activityType={item.activityType}
        taskType={item.taskType}
        client={item.client}
        fieldName={item.fieldName}
        fieldLocationPlaceName={item.fieldLocationPlaceName}
        date={item.date}
      />
    ),
    [],
  );

  return useMemo(
    () =>
      data ? (
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
          data={data}
          estimatedItemSize={100}
        />
      ) : (
        <LoadingAnimation />
      ),
    [data],
  );
}
