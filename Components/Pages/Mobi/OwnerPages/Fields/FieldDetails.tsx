import { Dimensions, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { OwnerMobiFieldsTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import {
  FieldI,
  FieldStatus,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllFieldsById } from '../../../../../helpers/api/Services/FieldsService';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { LineDivider } from '../../../../Atoms/LineDivider';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';

export function FieldDetails({
  route,
}: OwnerMobiFieldsTopTabProps<'fieldDetails', 'fields'>) {
  const { fieldId } = route.params;
  const { data: field } = useQuery<FieldI | undefined>(
    ['field', fieldId],
    ({ queryKey }) => getAllFieldsById(`${queryKey[1]}`),
  );
  const translateX = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateX.value, {
          duration: 200,
          easing: Easing.linear,
        }),
      },
    ],
  }));
  const deviceHeight = Dimensions.get('screen').height;

  const handlePress = () => {
    if (translateX.value === 0) translateX.value = -(deviceHeight * 0.5);
    else translateX.value = 0;
  };
  return (
    <SafeAreaView className="w-full h-fulls">
      <View className="h-full w-full bg-black" />
      <Animated.View
        className="h-full w-full absolute items-center left-0 bg-white pr-4 pl-4 rounded-t-xl"
        style={[{ top: '85%' }, animatedStyles]}
      >
        <TouchableOpacity className="w-full items-center" onPress={handlePress}>
          <LineDivider additionalStyles="h-2 rounded w-2/5" />
        </TouchableOpacity>
        <View className="w-full">
          <ScreenTitleHeader variant="sm" additionalTextStyles="">
            {field?.name}
          </ScreenTitleHeader>
          {field && (
            <TitleValueInfoComponent
              titles={[
                'Field ID',
                'voice',
                'county',
                'city',
                'area',
                'status',
                'DCA',
              ]}
              keys={[
                `...${field.fieldId.split('-')[4]}`,
                field.voice,
                field.county,
                field.city,
                field.area.toFixed(2),
                FieldStatus[field.status],
                field.dataCollectionDate,
              ]}
            />
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
