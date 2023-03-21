import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { RegisterStackParamList } from '../../frontendSelfTypes/NavigatorsInterfaces/RegisterStack';

export async function handleSaveDataMerge<
  DATA_TYPE,
  NEXT_ROUTE_NAME extends keyof RegisterStackParamList,
  CURR_RUTE_NAME extends keyof RegisterStackParamList,
>(
  key: string,
  data: DATA_TYPE,
  navi: RegisterMobiPropsBase<CURR_RUTE_NAME>['navigation'],
  nextRoute?: NEXT_ROUTE_NAME,
): Promise<boolean> {
  try {
    const exist = await AsyncStorage.getItem(key);
    const stringifyData = JSON.stringify(data);
    if (exist) {
      AsyncStorage.mergeItem(key, stringifyData);
      if (nextRoute) navi.navigate<keyof RegisterStackParamList>(nextRoute);
      return true;
    }
    AsyncStorage.setItem(key, stringifyData);
    if (nextRoute) navi.navigate<keyof RegisterStackParamList>(nextRoute);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function handleRestoreData<T>(
  key: string,
  setData: React.Dispatch<React.SetStateAction<T>>,
): Promise<boolean> {
  try {
    const restored = await AsyncStorage.getItem(key);
    if (restored) {
      setData(JSON.parse(restored) as T);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export async function restoreDataFromStorage<T>(
  key: string,
): Promise<T | false> {
  try {
    const restored = await AsyncStorage.getItem(key);
    if (restored) {
      return JSON.parse(restored) as T;
    }
    return false;
  } catch (e) {
    return false;
  }
}
