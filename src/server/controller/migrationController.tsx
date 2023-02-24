import { Migration } from "../model/migrationModel";

var migrationList: Migration[] = [];

export const getMigration = (url: string) => {
  console.log(migrationList);
  return migrationList.find((m) => m.url === url);
};

export const createMigration = (email: string, applicationId: number) => {
  const migration = new Migration(email, applicationId);
  migrationList.push(migration);
  console.log(migrationList);
  return migration;
};

export const deleteMigration = (url: string) => {
  migrationList = migrationList.filter((m) => m.url !== url);
};
