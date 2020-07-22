# sapper-md-netlify-cms-starter

## [![Netlify Status](https://api.netlify.com/api/v1/badges/2ad49513-ef65-4023-999f-1ad64bf08818/deploy-status)](https://app.netlify.com/sites/sapper-md-netlify-cms-starter/deploys)

An expansion of the default [Sapper](https://github.com/sveltejs/sapper) template in the following ways:

- blog posts are generated from markdown files in `content/posts`
- pages are able to be built from markdown files in `content/pages`
- netlify cms allows for editing of both blog posts and markdown source pages

## Getting Started


### Using `degit`

[`degit`](https://github.com/Rich-Harris/degit) is a scaffolding tool that lets you create a directory from a branch in a repository. Use either the `rollup` or `webpack` branch in `sapper-template`:

```bash
npx degit "edm00se/sapper-md-netlify-cms-starter" my-app
```


### Using GitHub Templates

Alternatively, you can use GitHub's template feature with the [sapper-template-rollup](https://github.com/edm00se/sapper-md-netlify-cms-starter) repository.


### Running the project

However you get the code, you can install dependencies and run the project in development mode with:

```bash
cd my-app
npm install
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.


## Structure

Sapper expects to find three directories in the root of your project —  `src`, `static`, and `content`. The `content` directory contains pages and blog posts in markdown files in their respective sub-directories, `static` is any static assets that need to be served, and `src` contains the majority of the sapper application.

### `src/`

Of note:

- change the `siteUrl` in `src/stores/_config.js`
- blog functionality is in `src/routes/blog/`
- pages in `src/routes/`, other than the home page (`index.svelte`), are generated via `[slug].json.js` and `[slug].svelte`


## Bundler

This Sapper starter uses Rollup to provide code-splitting and dynamic imports, as well as compiling your Svelte components.


## Deployment

As it exists in this repo, you can export with `npm run export` and publish the contents of `__sapper__/export`.


## License

MIT
