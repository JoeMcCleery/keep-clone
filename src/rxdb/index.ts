import { addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import {
  Database,
  DatabaseCollections,
  LabelSchema,
  NoteSchema,
} from "@/rxdb/types";
import labelSchema from "@/rxdb/schema/label.json";
import noteSchema from "@/rxdb/schema/note.json";

export default async function initRxDB() {
  // Add dev-mode plugins
  if (process.env.NODE_ENV == "development") {
    addRxPlugin(RxDBDevModePlugin);
  }

  // Add plugins
  addRxPlugin(RxDBMigrationSchemaPlugin);

  // Create database
  const db: Database = await createRxDatabase<DatabaseCollections>({
    name: "database",
    storage: getRxStorageDexie(),
  });

  // Add collections
  const collections = await db.addCollections({
    labels: {
      schema: labelSchema as LabelSchema,
      migrationStrategies: {
        1: function (oldLabel) {
          delete oldLabel.id;
          return oldLabel;
        },
      },
    },
    notes: {
      schema: noteSchema as NoteSchema,
      migrationStrategies: {
        1: function (oldNote) {
          oldNote.labels = [];
          return oldNote;
        },
      },
    },
  });

  return db;
}
