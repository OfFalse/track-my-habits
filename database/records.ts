import { db} from "./initdatabase";

// Create a record
export const createRecord = (habitId: number, completionDate: string, completionStatus: number, creationDate: string) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO records (habit_id, completion_date, completion_status, creation_date) VALUES (?, ?, ?, ?);`,
      [habitId, completionDate, completionStatus, creationDate],
      (_, result) => {
        // Handle success
        console.log('Record created successfully');
      },
      (_, error) => {
        // Handle error
        console.error('Error creating record:', error);
        return false;
      }
    );
  });
};

// Read all records
export const getAllRecords = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM records;`,
        [],
        (_, result) => {
          // Handle success
          const records = [...result.rows._array];
          resolve(records);
        },
        (_, error) => {
          // Handle error
          console.error('Error retrieving records:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// Update a record
export const updateRecord = (recordId: number, completionStatus: number) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE records SET completion_status = ? WHERE id = ?;`,
      [completionStatus, recordId],
      (_, result) => {
        // Handle success
        console.log('Record updated successfully');
      },
      (_, error) => {
        // Handle error
        console.error('Error updating record:', error);
        return false;
      }
    );
  });
};

// Delete a record
export const deleteRecord = (recordId: number) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM records WHERE id = ?;`,
      [recordId],
      (_, result) => {
        // Handle success
        console.log('Record deleted successfully');
      },
      (_, error) => {
        // Handle error
        console.error('Error deleting record:', error);
        return false;
      }
    );
  });
};