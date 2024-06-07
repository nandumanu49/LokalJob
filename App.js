import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import JobList from './components/JobList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <JobList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

