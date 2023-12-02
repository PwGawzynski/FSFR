import { Text, View } from 'react-native';
import React from 'react';
import { AppButton } from '../Atoms/AppButton';
import { handleGeneratePdf } from '../../helpers/handlers/handlePdf';
import { AccountingSummaryAndPrintProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function AccountingSummaryAndPrint({
  fields,
  columnsSettings,
}: AccountingSummaryAndPrintProps) {
  return (
    <View className="flex-1 justify-center">
      <View className="flex-1 flex-row justify-between items-center">
        <Text className="text-lg font-bold uppercase">Summa:</Text>
        <Text className="text-lg font-bold uppercase">
          {fields.reduce((prev, cur) => prev + cur.priceWTax, 0).toFixed(2)}
        </Text>
      </View>
      <AppButton
        action={() => handleGeneratePdf(columnsSettings, fields)}
        context="Print Proforma"
      />
    </View>
  );
}
