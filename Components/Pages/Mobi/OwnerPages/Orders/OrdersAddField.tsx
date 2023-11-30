import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import { GeoPortalApi } from '../../../../../helpers/api/GeoportalApi';
import { DataFromXMLRes } from '../../../../../FarmServiceTypes/Field/Ressponses';

enum State {
  WaitingForPermissionGrant,
  PermissionErr,
  PermissionGranted,
  WaitingForGps,
  GPSError,
  GPSCConnected,
  WaitingForDataTransform,
  DataTransformed,
  ConvertErr,
}
export function OrdersAddField() {
  const [machineState, setMachineState] = useState<State>(
    State.WaitingForPermissionGrant,
  );
  const [transformedData, setTransformedData] = useState<DataFromXMLRes | null>(
    null,
  );

  console.log(machineState);
  console.log(transformedData);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMachineState(State.PermissionErr);
      }
      if (status === 'granted') {
        setMachineState(State.PermissionGranted);
      }
      setMachineState(State.WaitingForGps);
      const locationGot = await Location.getCurrentPositionAsync({});
      if (locationGot) {
        setMachineState(State.GPSCConnected);
      } else setMachineState(State.GPSError);
      setMachineState(State.WaitingForDataTransform);
      const fieldInformationFromGps = await GeoPortalApi.driver(
        locationGot.coords.longitude.toString(),
        locationGot.coords.latitude.toString(),
      );
      if (fieldInformationFromGps) {
        setTransformedData(fieldInformationFromGps);
        setMachineState(State.DataTransformed);
      } else setMachineState(State.ConvertErr);
    })();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{State[machineState]}</Text>
      <Text>{JSON.stringify(transformedData)}</Text>
    </View>
  );
}
