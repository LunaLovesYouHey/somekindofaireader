import { app } from 'obsidian-app-client';
import PrivateOllamaPlugin from './ollama-plugin.js';

class IndexPlugin {
  name = 'IndexPlugin';
  description = 'A private plugin to interact with other files using the Ollama API.';

  async setup(app) {
    console.log(`Loaded ${PrivateOllamaPlugin.name} plugin.`);
    await PrivateOllamaPlugin.setup(app);
  }

  async getOllamaData() {
    const workspace = app.workspace();
    const notes = await workspace.notes();

    // Find the note with ID 'some-note-id'
    const targetNoteId = 'some-note-id';
    for (const note of notes) {
      if (note.id === targetNoteId) {
        return note.content;
      }
    }

    // If no note found, return default value
    return null; // or throw an error if you prefer
  }

  async saveOllamaData(file, data) {
    const workspace = app.workspace();
    const newFileId = file.id;

    try {
      await PrivateOllamaPlugin.saveOllamaData(workspace, file, data);
    } catch (error) {
      console.error(`Error saving data to ${newFileId}:`, error);
    }

    console.log(`Saved ${data} to ${file.id}`);
  }
}

export default IndexPlugin;