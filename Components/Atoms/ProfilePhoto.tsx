import { Image, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ProfilePhotoProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import UserSvg from '../../assets/user.svg';

export function ProfilePhoto({
  resizeMode,
  additionalImageStyles,
  additionalBoxStyles,
  imgLink,
  focused,
}: ProfilePhotoProps) {
  return (
    <View
      className={`w-8 h-8 rounded-full overflow-hidden items-center justify-center ${
        focused && 'border-solid border-[#279840] border-4'
      } ${additionalBoxStyles}`}
    >
      {imgLink ? (
        <Image
          resizeMode={resizeMode || 'cover'}
          className={`items-center justify-center w-full h-full${additionalImageStyles}`}
          source={{
            uri: imgLink,
          }}
        />
      ) : (
        <View className="w-full h-full bg-gray-300 items-center justify-center">
          <View className="items-center justify-center">
            <UserSvg fill="#000" width={24} height={24} />
          </View>
        </View>
      )}
    </View>
  );
}
