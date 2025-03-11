import { spawnSync } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';

const configFilePath = './metadata/private-plugin.config.json';
const pluginConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

module.exports = {
  name: 'MyPlugin',
  description: 'A private Obsidian Plugin using the PrivateOllama Plugin',
  run: async (args) => {
    if (args.command === 'read') {
      await this.readNote(args.noteId);
    } else if (args.command === 'list') {
      const output = spawnSync('node', ['src/plugin/index.js', '--watch']);
      console.log(output.stdout.toString());
    } else if (args.command === 'create') {
      await this.createNewNote();
    }
  },
  readNote: async (noteId) => {
    try {
      // Use fs.promises to read the contents of the note file
      const noteContents = await fs.readFile(`${pluginConfig.notesDir}/notes/${noteId}.md`, 'utf8');

      // Process and return the note contents
      return noteContents;
    } catch (error) {
      console.error(`Error reading note: ${noteId}`, error);
    }
  },
  createNewNote: async () => {
    try {
      // Create a new note with a random ID
      const newNoteId = `new-note-${Math.random().toString(36).slice(2)}`;
      await fs.writeFile(`${pluginConfig.notesDir}/notes/${newNoteId}.md`, 'This is a new note');

      console.log(`New note created: ${newNoteId}`);
    } catch (error) {
      console.error(error);
    }
  },
};