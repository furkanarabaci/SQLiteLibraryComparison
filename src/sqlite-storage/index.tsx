import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import SQLiteStorage from '@mendix/react-native-sqlite-storage';
import Queries from '../Queries';

SQLiteStorage.DEBUG(true);

export default () => {
  const [results, setResults] = useState({
    queryTime: 0,
  });

  const createQuery = async () => {
    const db = await SQLiteStorage.openDatabase({
      name: Queries.TABLE_NAME,
      location: "default",
      key: Queries.KEY_NAME
    });
    const startTime = Date.now();

    await db.transaction(async tx => {
      await tx.executeSql(Queries.CREATE_TABLE);

      for (let i = 0; i < Queries.ROW_COUNT; i++) {
        await tx.executeSql(Queries.INSERT_QUERY, [`User_${i}`]);
      }
    });

    const endTime = Date.now();
    setResults(prev => ({...prev, queryTime: endTime - startTime}));
    db.close();
  };
  return (
    <View>
      <Button title="Test react-native-sqlite-storage" onPress={createQuery} />
      <Text>Time: {results.queryTime} ms</Text>
    </View>
  );
};
