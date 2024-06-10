// SQLiteComparison.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import SQLiteStorage from './sqlite-storage';
import OPSQLite from './op-sqlite';

const SQLiteComparison = () => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>SQLite Performance Comparison</Text>
      <SQLiteStorage />
      <OPSQLite />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SQLiteComparison;
