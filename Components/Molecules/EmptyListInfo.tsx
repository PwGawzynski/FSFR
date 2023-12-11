import { Text, View } from 'react-native';
import { EmptyListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import EmptyIco from '../../assets/empty.svg';

export function EmptyListInfo({ text, children }: EmptyListProps) {
  return (
    <View
      testID="empty-list-info"
      className="flex-1 flex-col items-center justify-start"
    >
      <View
        testID="empty-ico-container"
        className="items-center justify-center"
      >
        {children ?? (
          <EmptyIco width={100} style={{ width: 100, height: 100 }} />
        )}
      </View>
      <Text
        testID="text-element"
        className="text-xl text-center text-[#848484]"
      >
        {text}
      </Text>
    </View>
  );
}
