import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { ScrollView, View } from 'react-native';
import { ActivityProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getLastActivitiesService } from '../../helpers/api/Services/Activities';
import { Activity } from '../Molecules/Activity';

export function LastActivities() {
  const [data, setData] = useState<Array<ActivityProps> | undefined>(undefined);
  const {
    mutate: getActivitiesMutate,
    data: activities,
    isSuccess,
  } = useMutation(getLastActivitiesService);
  useEffect(() => {
    if (!data) getActivitiesMutate();
  }, [data]);
  useEffect(() => setData(activities), [isSuccess]);
  return data ? (
    <ScrollView
      className="grow"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {data.map(activity => (
        <Activity
          key={Math.random()}
          activityLogCauser={activity.activityLogCauser}
          activityCauserRole={activity.activityCauserRole}
          activityType={activity.activityType}
          taskType={activity.taskType}
          client={activity.client}
          fieldName={activity.fieldName}
          fieldLocationPlaceName={activity.fieldLocationPlaceName}
          date={activity.date}
        />
      ))}
    </ScrollView>
  ) : (
    <View />
  );
}
