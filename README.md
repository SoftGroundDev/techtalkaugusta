# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Contributing

1. Read the [contributing guidelines](https://opensource.guide/)
2. Fork the repository
3. Create a new branch
   - Naming convention `feature/specifics` for new features `fix/specifics` for bugs
   - Example: `feature/contact-form` or `fix/contact-form-submission-errors`
   - Use GitHub issue number if available
4. Make your changes
5. Ensure passing e2es for all tests applicable to your changes
6. Commit and push your changes
7. Open a pull request. Include proof of passing e2es.


