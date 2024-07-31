import {
  RxJsonSchema,
  RxCollection,
  RxDatabase,
  RxCollectionCreator,
} from "rxdb";
import { Label } from "./generated/label";
import { Note } from "./generated/note";

export type LabelSchema = RxJsonSchema<Label>;

export type NoteSchema = RxJsonSchema<Note>;

export type LabelCollection = RxCollection<Label>;

export type NoteCollection = RxCollection<Note>;

export type DatabaseCollections = {
  labels: LabelCollection;
  notes: NoteCollection;
};

export type Database = RxDatabase<DatabaseCollections>;
