import { app } from 'obsidian-app-client';

/**
 * A private plugin that interacts with other files.
 */
class PrivateOllamaPlugin {
  /**
   * The name of this plugin.
   */
  static readonly name = 'Private Ollama Plugin';
  /**
   * A brief description of this plugin.
   */
  static readonly description = 'A private plugin for interacting with other files using the Ollama API.';

  /**
   * Initializes and sets up the plugin.
   *
   * @param {import('obsidian-app-client').App} app - The Obsidian app instance.
   */
  async setup(app) {
    console.log(`Loaded ${PrivateOllamaPlugin.name} plugin.`);
  }

  /**
   * Reads data from Obsidian using the Ollama API.
   *
   * @returns {Promise<string|null>} The content of a note with ID 'some-note-id', or null if not found.
   */
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

  /**
   * Saves data to Obsidian using the Ollama API.
   *
   * @param {import('obsidian-app-client').File} file - The file instance being saved.
   * @param {string|null} data - The content to be saved.
   */
  async saveOllamaData(file, data) {
    const workspace = app.workspace();
    const newFileId = file.id;

    try {
      await workspace.save(newFileId, { content: data });
    } catch (error) {
      console.error(`Error saving data to ${newFileId}:`, error);
    }

    console.log(`Saved ${data} to ${file.id}`);
  }
}

export default PrivateOllamaPlugin;