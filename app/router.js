import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import scanning from './screens/scanning';
import saveddocs from './screens/saveddocs';

let screen = Dimensions.get('window');
//
export const Tabs = TabNavigator({
  'scanning': {
    screen: scanning,
    navigationOptions: {
      tabBarLabel: 'scanning',
      tabBarIcon: ({ tintColor }) => <Icon name="scan-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
  'saveddocs': {
    screen: saveddocs,
    navigationOptions: {
      tabBarLabel: 'saved documents',
      tabBarIcon: ({ tintColor }) => <Icon name="folder-open-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
});

export const createRootNavigator = () => {
  return StackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
  );
};