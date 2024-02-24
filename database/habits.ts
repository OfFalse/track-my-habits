// Create a new habit
import { db } from './initdatabase';

export const createHabit = (name: string, description: string, iconRef: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO habits (name, description, icon_ref) VALUES (?, ?, ?);`,
        [name, description, iconRef],
        (_, result) => resolve(result.insertId),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Read all habits
export const readHabits = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM habits;`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Update a habit
export const updateHabit = (id: number, name: string, description: string, iconRef: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE habits SET name = ?, description = ?, icon_ref = ? WHERE id = ?;`,
        [name, description, iconRef, id],
        (_, result) => resolve(result.rowsAffected),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Delete a habit
export const deleteHabit = (id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM habits WHERE id = ?;`,
        [id],
        (_, result) => resolve(result.rowsAffected),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};