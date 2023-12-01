import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react';
import { Text, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { LocationObject } from 'expo-location';
import { DataFromXMLRes } from '../../FarmServiceTypes/Field/Ressponses';
import { AppInputRhf } from '../Atoms/AppInputRhf';
import { AppButton } from '../Atoms/AppButton';
import { getFontScaledSize } from '../../helpers/style/fontSize';

interface Props {
  transformedData: DataFromXMLRes;
  gpsCords: LocationObject;
  orderId: string;
}
export function AddFieldForm({ transformedData, gpsCords, orderId }: Props) {
  console.log(transformedData, orderId);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      city: transformedData.city,
      county: transformedData.county,
      dateOfCollectionData: transformedData.dateOfCollectionData || new Date(),
      voivodeship: transformedData.voivodeship,
      polishSystemId: transformedData.polishSystemId,
      area: transformedData.area,
      longitude: gpsCords.coords.longitude.toString().slice(0, 14),
      latitude: gpsCords.coords.latitude.toString().slice(0, 14),
    },
  });

  const onSubmitted = (data: DataFromXMLRes) => console.log(data);

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Controller
        control={control}
        rules={{
          min: { value: 1, message: '* City name cannot be empty' },
          max: {
            value: 70,
            message: '* City name cannot longer then 70 characters',
          },
          required: { value: true, message: '* Required' },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref, disabled },
        }) => (
          <AppInputRhf
            abs="mt-4"
            controllers={{
              field: { onChange, onBlur, value, ref, disabled, name },
            }}
          />
        )}
        name="city"
      />
      <Text className="text-[#f00] text-sm mt-2 mb-2">
        {errors.city?.message}
      </Text>
      <Controller
        control={control}
        rules={{
          min: { value: 1, message: '* County name cannot be empty' },
          max: {
            value: 70,
            message: '* County name cannot longer then 70 characters',
          },
          required: { value: true, message: '* Required' },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref, disabled },
        }) => (
          <AppInputRhf
            abs="mt-4"
            controllers={{
              field: { onChange, onBlur, value, ref, disabled, name },
            }}
          />
        )}
        name="county"
      />
      <Text className="text-[#f00] text-sm mt-2 mb-2">
        {errors.county?.message}
      </Text>
      <Controller
        control={control}
        rules={{
          min: { value: 1, message: '* Voivodeship name cannot be empty' },
          max: {
            value: 50,
            message: '* Voivodeship name cannot longer then 50 characters',
          },
          required: { value: true, message: '* Required' },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref, disabled },
        }) => (
          <AppInputRhf
            abs="mt-4"
            controllers={{
              field: { onChange, onBlur, value, ref, disabled, name },
            }}
          />
        )}
        name="voivodeship"
      />
      <Text className="text-[#f00] text-sm mt-2 mb-2">
        {errors.voivodeship?.message}
      </Text>
      <Controller
        control={control}
        rules={{
          min: { value: 1, message: '* PolishSystemId cannot be empty' },
          max: {
            value: 40,
            message: '* PolishSystemId cannot longer then 70 characters',
          },
          pattern: {
            value: /^\d{5,8}_\d+\.\d{4}\.\d{3}(\/\d+_BUD)?$/,
            message: '* PLID must fulfill pattern 02034_2.0008.241',
          },
          required: { value: true, message: '* Required' },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref, disabled },
        }) => (
          <AppInputRhf
            abs="mt-4"
            controllers={{
              field: { onChange, onBlur, value, ref, disabled, name },
            }}
          />
        )}
        name="polishSystemId"
      />
      <Text className="text-[#f00] text-sm mt-2 mb-2">
        {errors.polishSystemId?.message}
      </Text>
      <Controller
        control={control}
        rules={{
          minLength: {
            value: 0.00001,
            message: '* Area cannot be smaller then 0.00001',
          },
          maxLength: {
            value: 99999.99999,
            message: '* Area cannot be smaller then 99999.99999',
          },
          required: { value: true, message: '* Required' },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref, disabled },
        }) => (
          <AppInputRhf
            abs="mt-4"
            controllers={{
              field: { onChange, onBlur, value, ref, disabled, name },
            }}
          />
        )}
        name="area"
      />
      <Text className="text-[#f00] text-sm mt-2 mb-2">
        {errors.area?.message}
      </Text>

      <Controller
        control={control}
        render={({ field: { value } }) => (
          <View className="flex-row items-center justify-between mt-8 mb-8">
            <Text
              style={{ fontSize: getFontScaledSize(18) }}
              className=" uppercase font-bold"
            >
              Collection at:{' '}
            </Text>
            <RNDateTimePicker
              themeVariant="light"
              textColor="#000"
              disabled
              value={new Date(value)}
              mode="datetime"
            />
          </View>
        )}
        name="dateOfCollectionData"
      />
      <AppButton
        abs="mt-4"
        action={handleSubmit(onSubmitted)}
        context="Create Order"
      />
    </KeyboardAwareScrollView>
  );
}
