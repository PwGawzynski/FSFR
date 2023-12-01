import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useMutation } from 'react-query';
import { ProgressBar } from 'react-native-paper';
import { DataFromXMLRes } from '../../../../../FarmServiceTypes/Field/Ressponses';
import { getDataFromCords } from '../../../../../helpers/api/Services/Geoportal';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { AddFieldForm } from '../../../../Organisms/AddFieldForm';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';

enum State {
  WaitingForPermissionGrant = 0.222,
  PermissionErr = 0.333,
  PermissionGranted = 0.444,
  WaitingForGps = 0.555,
  GPSError = 0.666,
  GPSCConnected = 0.777,
  WaitingForDataTransform = 0.888,
  ConvertErr = 0.999,
  DataTransformed = 1,
}
export function OrdersAddField({
  route: {
    params: { orderId },
  },
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersAddField', 'orders'>) {
  const [machineState, setMachineState] = useState<State>(
    State.WaitingForPermissionGrant,
  );

  const { mutate, data, isLoading, isSuccess, isError } = useMutation(
    'locationCordsData',
    getDataFromCords,
    undefined,
  );
  const [transformedData, setTransformedData] = useState<DataFromXMLRes | null>(
    null,
  );
  /**
   * Data got from expo-gps
   */
  const [locationData, setLocationData] =
    useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMachineState(State.PermissionErr);
      }
      if (status === 'granted') {
        setMachineState(State.PermissionGranted);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (machineState === State.PermissionGranted)
        setMachineState(State.WaitingForGps);

      if (machineState === State.WaitingForGps) {
        const locationGot = await Location.getCurrentPositionAsync({});
        if (locationGot) {
          setMachineState(State.GPSCConnected);
          setLocationData(locationGot);
        } else setMachineState(State.GPSError);
      }

      if (machineState === State.GPSCConnected && locationData) {
        mutate({
          longitude: locationData.coords.longitude.toString(),
          latitude: locationData.coords.latitude.toString(),
        });
      }
    })();
  }, [machineState, locationData]);

  /**
   * Query driver, waiting on query states, and changes machine states to let next actions happened
   */
  useEffect(() => {
    if (isLoading) setMachineState(State.WaitingForDataTransform);
    if (isError) setMachineState(State.ConvertErr);
    if (isSuccess) setMachineState(State.DataTransformed);
    if (data) setTransformedData(data);
  }, [isSuccess, isLoading, isError, data]);

  return (
    <SafeAreaView className="w-full h-full">
      {orderId && (
        <View className="flex-1 flex-col mr-4 ml-4">
          {machineState !== State.DataTransformed && (
            <View className="flex-1 justify-center">
              <Text className="text-sm  uppercase">
                Loading: {State[machineState]}...
              </Text>
              <ProgressBar
                style={{
                  height: 15,
                  borderRadius: 20,
                  marginTop: 20,
                  backgroundColor: '#848484',
                }}
                progress={machineState}
                color="#279840"
                className="w-full"
              />
            </View>
          )}

          {machineState === State.DataTransformed &&
            transformedData &&
            locationData && (
              <View className="flex-1">
                <ScreenTitleHeader variant="lg">Add Field</ScreenTitleHeader>
                <AddFieldForm
                  navigation={navigation}
                  orderId={orderId}
                  gpsCords={locationData}
                  transformedData={transformedData}
                />
              </View>
            )}
        </View>
      )}
    </SafeAreaView>
  );
}
