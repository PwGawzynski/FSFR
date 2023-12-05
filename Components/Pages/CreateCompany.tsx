import { SafeAreaView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OwnerMobiDesktopRootStackProps } from '../../FrontendSelfTypes/navigation/types';
import { ScreenTitleHeader } from '../Atoms/ScreenTitleHeader';
import { AppInputRhf } from '../Atoms/AppInputRhf';
import { AppButton } from '../Atoms/AppButton';
import { AddCompany } from '../../helpers/api/Services/Company';
import { myAddress } from '../../helpers/api/Services/User';

export interface CreateCompanyI {
  city: string;
  county: string;
  houseNumber: string;
  postalCode: string;
  name: string;
}
export function CreateCompany({
  navigation,
}: OwnerMobiDesktopRootStackProps<'CreateCompany'>) {
  const { data } = useQuery('myAddress', myAddress);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCompanyI>({
    defaultValues: {
      city: data?.city,
      county: data?.county,
      houseNumber: data?.houseNumber,
      postalCode: data?.postalCode,
      name: '',
    } as CreateCompanyI,
  });

  useEffect(() => {
    if (data) {
      setValue('city', data.city);
      setValue('county', data.county);
      setValue('houseNumber', data.houseNumber);
      setValue('postalCode', data.postalCode);
    }
  }, [data]);

  const { mutate, isSuccess } = useMutation('createCompany', AddCompany);
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'desktop',
        shownMessage: "Everything is ready, Let's get down to work :)",
      });
    }
  }, [isSuccess]);
  const onSubmitted = (dataForm: CreateCompanyI) =>
    mutate({
      name: dataForm.name,
      address: {
        city: dataForm.city,
        county: dataForm.county,
        houseNumber: dataForm.houseNumber,
        postalCode: dataForm.postalCode,
      },
    });

  return (
    <SafeAreaView className="flex-1">
      {data && (
        <KeyboardAwareScrollView className="flex-1 ml-4 mr-4">
          <ScreenTitleHeader variant="lg">Company Details</ScreenTitleHeader>

          <Controller
            control={control}
            rules={{
              min: { value: 1, message: 'City name cannot be empty' },
              max: {
                value: 70,
                message: 'City name cannot longer then 70 characters',
              },
              required: { value: true, message: 'City name is required' },
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
          <View className="h-10 flex-col justify-center">
            <Text>{errors.city?.message}</Text>
          </View>
          <Controller
            control={control}
            rules={{
              min: { value: 1, message: 'County name cannot be empty' },
              max: {
                value: 70,
                message: 'County name cannot longer then 50 characters',
              },
              required: { value: true, message: 'County name is required' },
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
          <View className="h-10 flex-col justify-center">
            <Text>{errors.county?.message}</Text>
          </View>
          <Controller
            control={control}
            rules={{
              min: { value: 1, message: 'House number  cannot be empty' },
              max: {
                value: 20,
                message: 'House Number  cannot longer then 20 characters',
              },
              required: { value: true, message: 'House Number  is required' },
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
            name="houseNumber"
          />
          <View className="h-10 flex-col justify-center">
            <Text>{errors.houseNumber?.message}</Text>
          </View>
          <Controller
            control={control}
            rules={{
              min: { value: 1, message: 'Postal Code  cannot be empty' },
              max: {
                value: 6,
                message: 'Postal Code cannot longer then 6 characters',
              },
              required: { value: true, message: 'Postal Code is required' },
              pattern: {
                value: /^[0-9]{2}-[0-9]{3}$/,
                message: 'Postal code must match XX-XXX pattern',
              },
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
            name="postalCode"
          />
          <View className="h-10 flex-col justify-center">
            <Text>{errors.postalCode?.message}</Text>
          </View>
          <Controller
            control={control}
            rules={{
              min: { value: 1, message: 'Company name cannot be empty' },
              max: {
                value: 100,
                message: 'Company name cannot longer then 100 characters',
              },
              required: { value: true, message: 'Company name is required' },
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
          <AppButton
            abs="mt-4"
            action={handleSubmit(onSubmitted)}
            context="Add company"
          />
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
}
