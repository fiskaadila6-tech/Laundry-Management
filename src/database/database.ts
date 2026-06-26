import * as SQLite from 'expo-sqlite';
import { File, Paths } from 'expo-file-system';

export interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  image_uri: string | null;
}

const db = SQLite.openDatabaseSync('inventory.db');

export const initDB = (): void => {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      stock INTEGER NOT NULL,
      image_uri TEXT
    );`,
  );
};

export const getInventory = (): InventoryItem[] => {
  return db.getAllSync<InventoryItem>('SELECT * FROM inventory;');
};

export const addItem = async (
  name: string,
  stock: number,
  tempImageUri: string | null,
): Promise<number | string> => {
  let permanentUri: string | null = null;

  if (tempImageUri) {
    const fileName = tempImageUri.split('/').pop() || 'image.jpg';
    const tempFile = new File(tempImageUri);
    const permanentFile = new File(Paths.document, fileName);

    await tempFile.copy(permanentFile);
    permanentUri = permanentFile.uri;
  }

  const result = db.runSync(
    'INSERT INTO inventory (name, stock, image_uri) VALUES (?, ?, ?);',
    [name, stock, permanentUri],
  );

  return result.lastInsertRowId;
};

export const updateItem = async (
  id: number,
  name: string,
  stock: number,
  newTempUri: string | null,
  oldUri: string | null,
): Promise<void> => {
  let permanentUri: string | null = oldUri;

  if (newTempUri && newTempUri !== oldUri) {
    if (oldUri) {
      const oldFile = new File(oldUri);
      if (oldFile.exists) {
        oldFile.delete();
      }
    }

    const fileName = newTempUri.split('/').pop() || 'image.jpg';
    const tempFile = new File(newTempUri);
    const permanentFile = new File(Paths.document, fileName);

    await tempFile.copy(permanentFile);
    permanentUri = permanentFile.uri;
  }

  db.runSync(
    'UPDATE inventory SET name = ?, stock = ?, image_uri = ? WHERE id = ?;',
    [name, stock, permanentUri, id],
  );
};

export const deleteItem = async (
  id: number,
  imageUri: string | null,
): Promise<void> => {
  if (imageUri) {
    const file = new File(imageUri);
    if (file.exists) {
      file.delete();
    }
  }

  db.runSync('DELETE FROM inventory WHERE id = ?;', [id]);
};
