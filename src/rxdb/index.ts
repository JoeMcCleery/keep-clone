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
import { v5 as uuidv5, v4 as uuidv4 } from "uuid";

export function generateLabelId(name: string) {
  return uuidv5(name, uuidv5.DNS);
}

export function generateNoteId() {
  return uuidv4();
}

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
  const collections: DatabaseCollections = await db.addCollections({
    labels: {
      schema: labelSchema as LabelSchema,
      migrationStrategies: {
        1: function (oldLabel) {
          delete oldLabel.id;
          return oldLabel;
        },
        2: function (oldLabel) {
          oldLabel.id = generateLabelId(oldLabel.name);
          return oldLabel;
        },
        3: function (oldLabel) {
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

  // Add middleware
  collections.labels.preRemove(function (label) {
    // When removing label, also remove it's id from notes
    return collections.notes
      .find({
        selector: {
          labels: { $in: [label.id] },
        },
      })
      .exec()
      .then((notes) => {
        notes.forEach((note) => {
          note.incrementalPatch({
            labels: note.labels.filter((id) => id !== label.id),
          });
        });
      });
  }, false);

  return db;
}
