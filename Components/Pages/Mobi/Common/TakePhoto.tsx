import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { OwnerMobiDesktopRootStackProps } from '../../../../FrontendSelfTypes/navigation/types';
import { AppButton } from '../../../Atoms/AppButton';

export function TakePhoto({
  route,
  navigation,
}: OwnerMobiDesktopRootStackProps<'takePhoto'>) {
  const afterSuccessRedirectTo = route.params.onSuccessRedirectionLink;

  const cameraRef = useRef() as any;
  const [hasCameraPer, setCameraPer] = useState(false);
  const [hasMediaPer, setMediaPer] = useState(false);
  const [photo, setPhoto] = useState() as any;

  useEffect(() => {
    (async () => {
      const cameraPer = await Camera.requestCameraPermissionsAsync();
      const mediaLibPer = await MediaLibrary.requestPermissionsAsync();
      setCameraPer(cameraPer.status === 'granted');
      setMediaPer(mediaLibPer.status === 'granted');
    })();
  }, []);

  if (hasCameraPer === undefined) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Requesting permission</Text>
      </View>
    );
  }
  if (!hasCameraPer) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Enable camera!!</Text>
      </View>
    );
  }

  const takePicture = async () => {
    const options = {
      quality: 1,
      base64: true,
      ratio: [4, 3],
    };

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    const savePhoto = async () => {
      MediaLibrary.createAssetAsync(photo.uri).then(async data => {
        setPhoto(undefined);
        const { uri } = data;
        await MediaLibrary.getAlbumAsync('FarmServiceOwner').then(album => {
          if (album) {
            MediaLibrary.addAssetsToAlbumAsync(data, album).then(status => {
              if (status) {
                navigation.navigate(afterSuccessRedirectTo as any, {
                  imgUri: uri,
                });
              } else navigation.navigate(afterSuccessRedirectTo as any);
            });
          } else {
            MediaLibrary.createAlbumAsync('FarmServiceOwner', data).then(() => {
              navigation.navigate(afterSuccessRedirectTo as any, {
                imgUri: uri,
              });
            });
          }
        });
      });
    };
    return (
      <SafeAreaView className="w-screen h-screen items-center justify-center">
        <Image source={{ uri: photo.uri }} className="w-screen h-screen" />
        <View className=" flex-1 w-full h-full  items-center justify-center z-10 absolute">
          <AppButton action={savePhoto} context="SAVE" abs="m-10" />
          <AppButton
            action={() => setPhoto(undefined)}
            context="DISCARD"
            abs="m-0"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-screen w-screen items-center justify-start bg-black p-0">
      <Camera
        ref={cameraRef}
        className="w-screen h-screen items-center justify-end"
      >
        <AppButton action={takePicture} context="TAKE PICTURE" abs="mb-52" />
      </Camera>
    </SafeAreaView>
  );
}
