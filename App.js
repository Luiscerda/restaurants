import { LogBox } from 'react-native';
import Navigation from './navigations/Navigation';
import React from 'react';

LogBox.ignoreAllLogs()

export default function App() {
  return (
   <Navigation/>
  );
}

