import { SafeAreaView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { ScreenTitleHeader } from '../Atoms/ScreenTitleHeader';
import { CreateMachineReqI } from '../../FarmServiceTypes/Machine/Requests';
import { AppInputRhf } from '../Atoms/AppInputRhf';
import { AppButton } from '../Atoms/AppButton';
import { createMachine } from '../../helpers/api/Services/Machine';
import { OwnerMobiDesktopTopTabProps } from '../../FrontendSelfTypes/navigation/types';
import { ResponseObject } from '../../FarmServiceTypes/Respnse/responseGeneric';

export function AddMachine({
  navigation,
}: OwnerMobiDesktopTopTabProps<'notifications', 'desktop'>) {
  const { mutate, isSuccess, data, error } = useMutation(
    'createMachine',
    createMachine,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateMachineReqI>({
    defaultValues: {
      name: '',
      licensePlate: '',
    } as CreateMachineReqI,
  });
  const erData = (error as AxiosError)?.response?.data as ResponseObject<{
    message: string;
  }>;
  const err = erData?.payload?.message;
  useEffect(() => {
    if (isSuccess && data)
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'desktopRoot',
        shownMessage: `${data.name} has been added, you can start working`,
      });
  }, [isSuccess, data]);

  const onSubmitted = (formData: CreateMachineReqI) => mutate(formData);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mr-4 ml-4">
        <ScreenTitleHeader variant="lg">Add Machine</ScreenTitleHeader>

        <View className="h-10 flex-col justify-center">
          <Text className="text-center text-[#f00] ">{err}</Text>
        </View>

        <Controller
          control={control}
          rules={{
            min: { value: 1, message: "Machine's name cannot be empty" },
            max: {
              value: 50,
              message: "Machine's name cannot longer then 50 characters",
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
            min: {
              value: 1,
              message: "Machine's license plate cannot be empty",
            },
            max: {
              value: 50,
              message:
                "Machine's license plate cannot longer then 50 characters",
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
          name="licensePlate"
        />
        <View className="h-10 flex-col justify-center">
          <Text>{errors.licensePlate?.message}</Text>
        </View>
        <AppButton
          abs="mt-4"
          action={handleSubmit(onSubmitted)}
          context="Create Order"
        />
      </View>
    </SafeAreaView>
  );
}
