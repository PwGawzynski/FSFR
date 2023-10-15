import { View } from 'react-native';
import { ScreenTitleHeader } from './ScreenTitleHeader';
import { OrderDetailsHeaderProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { AppButton } from './AppButton';

export function HeaderWithButton({
  onButtonClick,
  headerText,
  variant,
  headerAdditionalStyles,
  buttonText,
  buttonAdditionalStyles,
  boxAdditionalStyles,
  buttonTextAdditionalStyles,
}: OrderDetailsHeaderProps) {
  return (
    <View className={`flex justify-between flex-row  ${boxAdditionalStyles}`}>
      <ScreenTitleHeader variant={variant} abs={`${headerAdditionalStyles}`}>
        {headerText}
      </ScreenTitleHeader>
      <AppButton
        action={onButtonClick}
        context={buttonText}
        abs={`bg-[#279840] flex-1 ${buttonAdditionalStyles}`}
        ats={`text-sm ${buttonTextAdditionalStyles}`}
      />
    </View>
  );
}
