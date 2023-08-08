import { CompanyAddressDataCdn } from '../../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { handleRestoreDataFromSecureStore } from '../../handlers/SecureStoreHelpers';
import { handleGetDataFromStore } from '../../handlers/handleGetDataFromStore';
import { Api } from '../Api';
import {
  ResponseCode,
  ResponseObject,
} from '../../../FarmServiceTypes/Respnse/responseGeneric';
import {
  handleRemoveDataFromStore,
  handleSaveDataMerge,
} from '../../handlers/AsyncStoreHelpers';
import { RegisterStackParamList } from '../../../FrontendSelfTypes/NavigatorsInterfaces/RegisterStack';
import { RegisterScreenNavBaseProps } from '../../../FrontendSelfTypes/navigation/types';

export const registerService = async <T extends keyof RegisterStackParamList>(
  userData: CompanyAddressDataCdn,
  navigation: RegisterScreenNavBaseProps<T>,
) => {
  await handleRestoreDataFromSecureStore('RegisterPwd');
  const storedData = await handleGetDataFromStore();
  if (storedData) {
    const authResponse = await Api.registerInAuthUser({
      email: storedData.email,
      password: await handleRestoreDataFromSecureStore('RegisterPwd'),
    });
    if (authResponse) {
      const response = (
        await Api.registerNewUser({
          ...storedData,
          ...userData,
        })
      ).data as ResponseObject;
      if (response.code === ResponseCode.ProcessedWithoutConfirmationWaiting) {
        navigation.navigate('AuthCode');
        handleRemoveDataFromStore([
          'RegisterMobiDataEmailAndPassword',
          'RegisterMobiDataNameSurname',
          'RegisterMobiDataContactPhones',
          'RegisterMobiDataAddresses',
          'RegisterMobiDataAddressesCdn',
          'RegisterMobiUserRole',
        ]);
        console.log('Done');
        return true;
      }
    } else {
      console.warn('Cannot restore data in AddressesCdn');
      handleSaveDataMerge('RegisterMobiDataAddressesCdn', userData);
      throw new Error('Something bad happen, try again later');
    }
  }
  throw new Error('Something bad happen, try again later');
};
