import * as SQLite from 'expo-sqlite';

// Open or create the database
export const db = SQLite.openDatabase('habit-track.db');

// Initialize the database
export const initializeDatabase = () => { 
  // Create the 'habits' table
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        icon_ref TEXT
      );`,
      [],
      (_, result) => {
        console.log('Habits table created successfully');
      },
      (_, error) => {
        console.log('Error creating habits table:', error);
        return false;
      }
    );
  });


  // Create the 'records' table
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habit_id INTEGER,
        completion_date TEXT,
        completion_status INTEGER,
        creation_date TEXT,
        FOREIGN KEY (habit_id) REFERENCES habits (id)
      );`,
      [],
      (_, result) => {
        console.log('Records table created successfully');
      },
      (_, error) => {
        console.log('Error creating records table:', error);
        return false;
      }
    );
  });
};

