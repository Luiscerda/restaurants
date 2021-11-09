import { LogBox } from 'react-native';
import Navigation from './navigations/Navigation';
import React from 'react';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  return (
   <Navigation/>
  );
}

