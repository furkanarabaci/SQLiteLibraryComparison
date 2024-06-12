import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { open } from '@op-engineering/op-sqlite';
import { OPSQLite } from '../DatabaseAdapter';
import ComplexUniversity from '../queries/ComplexUniversity';

export default () => {
  const [results, setResults] = useState({
    queryTime: 0,
  });
  const createQuery = async () => {
    const db = new OPSQLite();
    await db.openDatabase({
      tableName: ComplexUniversity.tableName,
      key: ComplexUniversity.keyName,
      location: 'default'
    })
    const startTime = Date.now();
    await db.transaction(ComplexUniversity.queries)
    const endTime = Date.now();
    setResults(prev => ({ ...prev, queryTime: endTime - startTime }));
    db.closeDatabase();
  };

  return (
    <View>
      <Button title="Test @op-engineering/op-sqlite" onPress={createQuery} />
      <Text>Time: {results.queryTime} ms</Text>
    </View>
  )
};