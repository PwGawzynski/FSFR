import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { memo, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { AppInput } from '../Molecules/AppInput';
import { AppEnumBasedPickerInput } from '../Atoms/AppEnumBasedPickerInput';
import {
  NewWorker,
  NewWorkerFormProps,
  WorkerPosition,
  WorkerStatus,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { SmallHeader } from '../Molecules/SmallHeader';
import { useValidation } from '../../helpers/hooks/validationHook';
import { AddWorkerSchema } from '../../helpers/validation/mobileSchemas/AddWorkerSchema';
import { AppButton } from '../Atoms/AppButton';
import { ErrorInfoText } from '../Atoms/ErrorInfoText';
import { addNewWorker } from '../../helpers/api/Services/Worker';

const INIT_WORKER: NewWorker = {
  county: '',
  email: '',
  surname: '',
  name: '',
  phone: '',
  province: '',
  address: '',
  dateOfBirth: '',
  status: undefined,
  photoUrl: '',
  position: undefined,
};

const WHEN_LOADING_ANIMATION_DURATION = 400;

const NewWorkerForm = memo(
  ({
    setProfileSign,
    profilePhotoUrl,
    setLoadingIndicator,
    navigation,
  }: NewWorkerFormProps) => {
    const {
      mutate: createNewWorker,
      isLoading,
      isSuccess,
    } = useMutation(addNewWorker);
    const [newWorker, setNewWorker] = useState<NewWorker>(INIT_WORKER);
    const [submitted, setSubmitted] = useState(false);
    const opacity = useSharedValue(1);

    const handleSetProfileName = () =>
      setProfileSign(prevState => ({
        ...prevState,
        name: newWorker.name,
      }));

    const handleSetProfileSurname = () =>
      setProfileSign(prevState => ({
        ...prevState,
        surname: newWorker.surname,
      }));

    const handleSetWorkerPosition = (v: unknown, i: number) =>
      setNewWorker(prevState => ({ ...prevState, position: i }));
    const handleSetWorkerStatus = (v: unknown, i: number) =>
      setNewWorker(prevState => ({ ...prevState, status: i }));

    const [{ isError, errorMessages }, setCanValidate] =
      useValidation<NewWorker>(newWorker, AddWorkerSchema, [submitted]);

    useEffect(() => {
      /**
       * listen on prop profilePhotoUrl, to set profile photo uri in newWorker, which will be used to send to backend
       */
      if (profilePhotoUrl)
        setNewWorker(prevState => ({
          ...prevState,
          photoUrl: profilePhotoUrl,
        }));
    }, [profilePhotoUrl]);

    useEffect(() => {
      /**
       * Listen when button has been clicked and validation done without any error then starts mutation
       */
      if (!isError && submitted) {
        createNewWorker(newWorker);
      }
    }, [isError, submitted]);

    useEffect(() => {
      /**
       * when mutation is loading switches on Activity indicator in top right corner on screen
       */
      setLoadingIndicator(isLoading);
      /**
       * starts form opacity animation when mutation is loading
       */
      if (isLoading)
        opacity.value = withTiming(0.5, {
          duration: WHEN_LOADING_ANIMATION_DURATION,
        });
    }, [isLoading]);

    useEffect(() => {
      /**
       * when button has been clicked, and on mutation error occurred,
       * below statement reset state to allow  action to be repeated
       */
      if (isSuccess && submitted) setSubmitted(false);
      /**
       * to revert opacity to default 1 when mutation is done,
       * this is for user's experience, to prevent filing like animation crashed
       */
      if (isSuccess) {
        opacity.value = withTiming(1, {
          duration: WHEN_LOADING_ANIMATION_DURATION,
        });
        /**
         * to allow opacity animation to be done
         */
        setTimeout(
          () =>
            navigation.navigate('OperationConfirmed', {
              redirectScreenName: 'materialWorkersRoot',
              shownMessage:
                'Congrats, your getting big. Your new employee will get email with link activating his new account',
            }),
          WHEN_LOADING_ANIMATION_DURATION,
        );
      }
    }, [isSuccess]);

    return (
      <Animated.View className="flex-1" style={{ opacity }}>
        <KeyboardAwareScrollView
          className="w-full h-full"
          showsVerticalScrollIndicator={false}
        >
          {isError && (
            <ErrorInfoText additionalStyles="text-center mt-2 mb-2">
              {errorMessages[0]}
            </ErrorInfoText>
          )}

          <AppInput
            onDeFocus={handleSetProfileName}
            setter={setNewWorker}
            ObjectKey="name"
            value={newWorker.name}
            underlyingLabel="Name"
          />
          <AppInput
            onDeFocus={handleSetProfileSurname}
            setter={setNewWorker}
            ObjectKey="surname"
            value={newWorker.surname}
            underlyingLabel="Surname"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="phone"
            value={newWorker.phone}
            underlyingLabel="Phone"
            keyboardType="phone-pad"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="email"
            value={newWorker.email}
            underlyingLabel="E-mail"
            keyboardType="email-address"
          />
          <AppEnumBasedPickerInput
            onChange={handleSetWorkerPosition}
            enumName={WorkerPosition}
          />
          <AppEnumBasedPickerInput
            onChange={handleSetWorkerStatus}
            enumName={WorkerStatus}
          />
          <SmallHeader abs="mt-14">Address DAta</SmallHeader>
          <AppInput
            setter={setNewWorker}
            ObjectKey="address"
            value={newWorker.address}
            underlyingLabel="Address ( house number, street )"
            keyboardType="default"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="county"
            value={newWorker.county}
            underlyingLabel="County"
            keyboardType="default"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="province"
            value={newWorker.province}
            underlyingLabel="Province"
            keyboardType="default"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="dateOfBirth"
            value={newWorker.dateOfBirth}
            underlyingLabel="Date Of Birth ( YYYY- MM-DD )"
            keyboardType="numbers-and-punctuation"
          />
          <AppButton
            abs="mt-8 mb-8"
            action={() => {
              if (!isLoading) {
                setSubmitted(true);
                setCanValidate(true);
              }
            }}
            context="Create New Worker"
          />
        </KeyboardAwareScrollView>
      </Animated.View>
    );
  },
  (prevProps, curProps) =>
    prevProps.profilePhotoUrl === curProps.profilePhotoUrl,
);

NewWorkerForm.displayName = 'NewWorkerForm';

export default NewWorkerForm;
