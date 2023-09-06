import { View } from 'react-native';
import React from 'react';
import { ScreenTitleHeader } from './ScreenTitleHeader';
import { ErrorInfoText } from './ErrorInfoText';
import { handlePrintErrorToUser } from '../../helpers/handlers/HandlePrintErrorToUser';
import { AddOrderErrorInfoProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function AddOrderErrorInfo({
  isNewOrderError,
  newOrderErrorValue,
  validator,
  btnClicked,
  clientValidator,
}: AddOrderErrorInfoProps) {
  return (
    <>
      <View className="flex-1 grow w-full">
        <ScreenTitleHeader variant="lg">Add Order</ScreenTitleHeader>
      </View>
      <View className="items-center w-full">
        {((isNewOrderError || validator.isError) && btnClicked && (
          <ErrorInfoText additionalStyles="">
            {isNewOrderError
              ? handlePrintErrorToUser(newOrderErrorValue)
              : validator.errorMessages}
          </ErrorInfoText>
        )) ||
          (clientValidator.isError && btnClicked && (
            <ErrorInfoText additionalStyles="">
              {clientValidator.errorMessages}
            </ErrorInfoText>
          ))}
      </View>
    </>
  );
}
