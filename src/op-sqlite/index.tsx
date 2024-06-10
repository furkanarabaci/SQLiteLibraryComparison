import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { open } from '@op-engineering/op-sqlite';
import Queries from '../Queries';

export default () => {
  const [results, setResults] = useState({
    queryTime: 0,
  });
  const createQuery = async () => {
    const db = open({ name: Queries.TABLE_NAME, encryptionKey: Queries.KEY_NAME });
    db.execute('PRAGMA cache_size=-64000');
    db.execute('PRAGMA mmap_size=268435456');
    const startTime = Date.now();

    await db.transaction(async tx => {
      await tx.executeAsync(Queries.CREATE_TABLE);

      for (let i = 0; i < Queries.ROW_COUNT; i++) {
        await tx.executeAsync(Queries.INSERT_QUERY, [`User_${i}`]);
      }
    });

    const endTime = Date.now();
    setResults(prev => ({ ...prev, queryTime: endTime - startTime }));
    db.close();
  }

  return (
    <View>
      <Button title="Test @op-engineering/op-sqlite" onPress={createQuery} />
      <Text>Time: {results.queryTime} ms</Text>
    </View>
  )
};