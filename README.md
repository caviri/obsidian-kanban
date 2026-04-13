# Obsidian Kanban Plugin

**The Kanban plugin is looking for new maintainers.** Interested? [Read more here.](https://github.com/mgmeyers/obsidian-kanban/blob/main/MAINTAINERS.md)

---

Create markdown-backed Kanban boards in [Obsidian](https://obsidian.md/)

- [Bugs, Issues, & Feature Requests](https://github.com/mgmeyers/obsidian-kanban/issues)
- [Development Roadmap](https://github.com/mgmeyers/obsidian-kanban/projects/1)

![Screen Shot 2021-09-16 at 12.58.22 PM.png](https://github.com/mgmeyers/obsidian-kanban/blob/main/docs/Assets/Screen%20Shot%202021-09-16%20at%2012.58.22%20PM.png)

![Screen Shot 2021-09-16 at 1.10.38 PM.png](https://github.com/mgmeyers/obsidian-kanban/blob/main/docs/Assets/Screen%20Shot%202021-09-16%20at%201.10.38%20PM.png)

## Documentation

Find the plugin documentation here: [Obsidian Kanban Plugin Documentation](https://publish.obsidian.md/kanban/)

## Development

This fork is configured as a separate plugin so it can run alongside the official Kanban from Community Plugins:

- **Plugin id:** `obsidian-kanban-dev` (see `manifest.json`)
- **Display name:** Kanban (dev)

### Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Produce a build (`main.js`, `styles.css` at the repo root):

   ```bash
   yarn build
   ```

   For watch mode while you edit (rebuilds on save):

   ```bash
   yarn dev
   ```

3. Point your vault at this folder. Obsidian loads plugins from  
   `<vault>/.obsidian/plugins/<plugin-id>/`, so the directory name must be **`obsidian-kanban-dev`**.

   Create the plugins directory if needed, then symlink the repo (adjust the vault path):

   ```bash
   mkdir -p "/path/to/your/vault/.obsidian/plugins"

   ln -sf "/path/to/obsidian-kanban" \
     "/path/to/your/vault/.obsidian/plugins/obsidian-kanban-dev"
   ```

4. In Obsidian, open that vault. **Settings → Community plugins:** turn off restricted mode if required, then enable **Kanban (dev)**.

After code changes, run `yarn build` again (or keep `yarn dev` running) and reload the app or toggle the plugin if changes do not appear.

### Other scripts

| Command        | Purpose              |
| -------------- | -------------------- |
| `yarn typecheck` | TypeScript check   |
| `yarn lint`      | ESLint             |
| `yarn lint:fix`  | ESLint with fixes  |
