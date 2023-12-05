import { useMutation } from 'react-query';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { OwnerOrdersMaterialRootNavigationProps } from '../../FrontendSelfTypes/navigation/types';
import { addNewOrder } from '../../helpers/api/Services/OrdersService';
import { CreateOrderReqI } from '../../FarmServiceTypes/Order/Requests';
import { ServiceType } from '../../FarmServiceTypes/Order/Enums';
import { AppInputRhf } from '../Atoms/AppInputRhf';
import { getFontScaledSize } from '../../helpers/style/fontSize';
import { AppButton } from '../Atoms/AppButton';

export interface AddOrderFormProps {
  navigation: OwnerOrdersMaterialRootNavigationProps<
    'addOrder',
    'ordersRoot',
    'orders'
  >;
  resetToggle: boolean;
}

export function AddOrderForm({ navigation, resetToggle }: AddOrderFormProps) {
  const { isSuccess, mutate } = useMutation(addNewOrder);

  // after validation clear all states and navi to confirmation
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'ordersRoot',
        shownMessage: 'Order Has Been Added',
      });
    }
  }, [isSuccess]);

  const onSubmitted = (data: CreateOrderReqI) => mutate(data);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOrderReqI>({
    defaultValues: {
      name: '',
      performanceDate: new Date(),
      serviceType: ServiceType.Harvesting,
      additionalInfo: '',
    } as CreateOrderReqI,
  });

  useEffect(() => {
    reset();
  }, [resetToggle]);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Controller
        control={control}
        rules={{
          min: { value: 1, message: "Task's name cannot be empty" },
          max: {
            value: 50,
            message: "Task's name cannot longer then 50 characters",
          },
          required: { value: true, message: "Task's name is required" },
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
        name="name"
      />

      <View className="h-10 flex-col justify-center">
        <Text>{errors.name?.message}</Text>
      </View>
      <Controller
        control={control}
        rules={{
          min: { value: 1, message: 'ServiceType is required ' },
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row items-center justify-between  ">
            <RNPickerSelect
              value={value ? ServiceType[value - 1] : 'Select Service Type'}
              placeholder={{ label: 'Select Service Type' }}
              onValueChange={(selectedValue, index) => onChange(index)}
              style={{
                inputIOS: {
                  textAlign: 'left',
                  fontSize: getFontScaledSize(18),
                  borderBottomColor: '#000',
                  borderBottomWidth: 4,
                  height: 60,
                },
                viewContainer: { width: '100%' },
                done: {
                  textAlign: 'center',
                  alignItems: 'center',
                  width: '100%',
                },
                placeholder: {
                  color: /* validationError ? 'red' : */ '#848484',
                },
              }}
              items={(
                Object.values(ServiceType).filter(e =>
                  Number.isNaN(Number(e)),
                ) as Array<string>
              ).map((name: string) => ({
                label: name,
                value: name,
              }))}
            />
          </View>
        )}
        name="serviceType"
      />
      <View className="h-10 flex-col justify-center">
        <Text>{errors.serviceType?.message}</Text>
      </View>
      <Controller
        control={control}
        render={({ field: { value } }) => (
          <View className="flex-row items-center justify-between mt-8 mb-8">
            <Text
              style={{ fontSize: getFontScaledSize(18) }}
              className=" uppercase font-bold"
            >
              Perform at:{' '}
            </Text>
            <RNDateTimePicker value={new Date(value)} mode="datetime" />
          </View>
        )}
        name="performanceDate"
      />

      <Controller
        control={control}
        rules={{ min: 1, max: 10000, required: false }}
        render={({ field: { onChange, value } }) => (
          <View className="justify-center">
            <Text className="uppercase font-semibold mb-1 mt-4 text-[#848484]">
              Additional info:
            </Text>
            <View className="w-full h-32 border-2 border-[#848484] rounded  mb-4">
              <TextInput onChangeText={onChange} value={value} multiline />
            </View>
          </View>
        )}
        name="additionalInfo"
      />
      <AppButton
        abs="mt-4"
        action={handleSubmit(onSubmitted)}
        context="Create Order"
      />
    </KeyboardAwareScrollView>
  );
}
