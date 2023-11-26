import { SafeAreaView, Text, TextInput, View } from 'react-native';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addNewOrder } from '../../../../../helpers/api/Services/OrdersService';
import { OwnerOrdersMaterialRootProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { AppButton } from '../../../../Atoms/AppButton';
import { AppInputRhf } from '../../../../Atoms/AppInputRhf';
import { HeaderWithButton } from '../../../../Atoms/HeaderWithButton';
import { CreateOrderReqI } from '../../../../../FarmServiceTypes/Order/Requests';
import { getFontScaledSize } from '../../../../../helpers/style/fontSize';
import { ServiceType } from '../../../../../FarmServiceTypes/Order/Enums';

export function AddOrder({
  navigation,
}: OwnerOrdersMaterialRootProps<'addOrder', 'ordersRoot', 'orders'>) {
  const { isSuccess: hasOrderBeenAdded, mutate: createOrder } =
    useMutation(addNewOrder);

  // after validation clear all states and navi to confirmation
  useEffect(() => {
    if (hasOrderBeenAdded) {
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'ordersRoot',
        shownMessage: 'Order Has Been Added',
      });
    }
  }, [hasOrderBeenAdded]);

  const onSubmitted = (data: CreateOrderReqI) => createOrder(data);

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
  const onReset = () => reset();

  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 flex-col mr-4 ml-4">
        <HeaderWithButton
          variant="lg"
          buttonText="reset"
          headerText="add new order"
          onButtonClick={onReset}
          buttonAdditionalStyles="ml-12"
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            rules={{ min: 1, max: 50, required: true }}
            render={({
              field: { onChange, onBlur, value, name, ref, disabled },
            }) => (
              <AppInputRhf
                abs="mt-4 mb-4"
                controllers={{
                  field: { onChange, onBlur, value, ref, disabled, name },
                }}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{ validate: dat => dat !== 0, required: true }}
            render={({ field: { onChange } }) => (
              <View className="flex-row items-center justify-between  mb-4">
                <RNPickerSelect
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
            rules={{ min: 1, max: 10000, required: true }}
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
      </View>
    </SafeAreaView>
  );
}
