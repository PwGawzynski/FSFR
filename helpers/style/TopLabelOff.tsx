import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

export const topLabelOff = {
  tabBarStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  tabBarActiveTintColor: '#000',
  tabBarInactiveTintColor: '#000',
  tabBarIndicatorStyle: {
    backgroundColor: 'transparent',
  },
  tabBarShowLabel: false,
} as MaterialTopTabNavigationOptions;
