import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export interface TimerProps {
  targetDate: string | Date;
}
function Timer({ targetDate }: TimerProps) {
  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const timeElapsed = now - targetTime;
    if (timeElapsed <= 0) {
      return 0;
    }

    return timeElapsed;
  }

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();

      if (remaining === 0) {
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <View className="flex-1 flex-col justify-center">
      <View className="items-center justify-center flex-row">
        <View>
          <Text className="text-4xl">
            {hours < 10 ? `0${hours}` : hours}h :{' '}
          </Text>
        </View>
        <View>
          <Text className="text-4xl">
            {minutes < 10 ? `0${minutes}` : minutes}m :{' '}
          </Text>
        </View>
        <View>
          <Text className="text-4xl">
            {seconds < 10 ? `0${seconds}` : seconds}s
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Timer;
