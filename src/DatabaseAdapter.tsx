import { open, Transaction as OPSqliteTransaction } from '@op-engineering/op-sqlite';
import MendixSQLiteStorage, { Transaction as MendixSQLiteTransaction } from '@mendix/react-native-sqlite-storage';
interface OpenOptions {
  tableName: string;
  key: string;
  location?: string;
}

type Query = string | { text: string, params?: string[] | undefined };

interface Transaction {
  executeAsync(query: Query): Promise<unknown>;
}

interface SQLiteBase extends Transaction {
  openDatabase(options: OpenOptions): Promise<unknown>;
  transaction(queries: Query[]): Promise<unknown>;
  closeDatabase(): void;
  isOpen(): boolean;
}

export class OPSQLite implements SQLiteBase {
  private isDbOpen = false;
  isOpen(): boolean {
    return this.isDbOpen;
  }
  private db!: ReturnType<typeof open>;
  async openDatabase(options: OpenOptions) {
    this.db = open({
      name: options.tableName,
      encryptionKey: options.key,
      location: options.location || 'default'
    });
    this.db.execute('PRAGMA cache_size=-64000');
    this.db.execute('PRAGMA mmap_size=268435456');
    this.isDbOpen = true;
  }
  async executeAsync(query: Query): Promise<unknown> {
    const queryText = typeof query === 'string' ? query : query.text;
    const queryParams = typeof query === 'string' ? undefined : query.params;
    return await this.db.executeAsync(queryText, queryParams);
  }
  async transaction(queries: Query[]) {
    return this.db.transaction(async (tx) => {
      for(const query of queries) {
        const queryText = typeof query === 'string' ? query : query.text;
        const queryParams = typeof query === 'string' ? undefined : query.params;
        await tx.executeAsync(queryText, queryParams);
      }
    });
  }
  closeDatabase(): void {
    this.db.close();
    this.isDbOpen = false;
  }
} 

export class MendixSQLite implements SQLiteBase {
  private isDbOpen = false;
  private db!: Awaited<ReturnType<typeof MendixSQLiteStorage.openDatabase>>
  isOpen(): boolean {
    return this.isDbOpen;
  }
  async openDatabase(options: OpenOptions) {
    this.db = await MendixSQLiteStorage.openDatabase({
      name: options.tableName,
      location: 'default',
      key: options.key
    });
    this.isDbOpen = true;
  }
  async executeAsync(query: Query): Promise<any> {
    const queryText = typeof query === 'string' ? query : query.text;
    const queryParams = typeof query === 'string' ? undefined : query.params;
    return await this.db.executeSql(queryText, queryParams);
  }
  async transaction(queries: Query[]) {
    return await this.db.transaction(async (tx) => {
      for (const query of queries) {
        const queryText = typeof query === 'string' ? query : query.text;
        const queryParams = typeof query === 'string' ? undefined : query.params;
        await tx.executeSql(queryText, queryParams);
      }
    });
  }
  closeDatabase(): void {
    this.db.close();
    this.isDbOpen = false;
  }
}