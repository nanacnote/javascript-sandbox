## component-bundler

Storybook react UI assets.

[View Page](https://hiram-labs.github.io/component-bundler/)

## Dev setup

Have a `.env.local` with `GH_TOKEN` set at the root of project.

```
git clone https://github.com/hiram-labs/component-bundler.git
yarn
```

### Running locally

```
yarn storybook
```

### Dev helpers

- Adding svg assets to the library

  Add the svg file or files into `~/src/assets/svg`

  Note that to rerun this script on an svg that has already be added you will need to delete the corresponding `.tsx` file inside `~/src/assets/svg`

  Note the original svg file will be converted to `.tsx` and the `.svg` will be deleted

```
yarn add-svg
```

- Get new component boilerplate.
  This action also updates the entry file @ ~/src/index.ts with the right exports for babel bundling

```
yarn add-comp
```

- Update this doc.
  Add your changes to `README.md` at root of the app.

```
yarn add-doc
```

### Dev best practice

1. Do not use components in the library inside other components in the library Always recreate, The goal is to have independent components with all their dependencies directly inside said component's root folder. **_Exception for `<Svg>` only_**

## Consume Package

**Note**

Generate a github token(GH_TOKEN) from the github website under:

`settings>developer settings>personal access token`

This should only have `read packages` access and nothing else.

`GH_TOKEN` must be available in current shell.

Make `GH_TOKEN` available in shell by:

```
printf export GH_TOKEN=[whatever_the_value_is] >> ~/.profile && . ~/.profile
export GH_TOKEN=[whatever_the_value_is]
```

> **_The first option will keep the value permanently in the shell profile and will be available on every logged in shell session._**
>
> **_The second option will make the value available only in the current shell._**

1. For yarn managed apps.
   Add text below to `.yarnrc` and run `yarn add @hiram-labs/component-bundler`

```
npmScopes:
  hiram-labs:
    npmAlwaysAuth: true
    npmAuthToken: "${GH_TOKEN}"
    npmRegistryServer: "https://npm.pkg.github.com/"
```

2. For npm managed apps.
   Add text below to `.npmrc` and run `npm install @hiram-labs/component-bundler`

```
@hiram-labs:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=$GH_TOKEN
```

**Not recommended shortcut**

The `GH_TOKEN` can be directly added to the `.npmrc` or `.yarnrc` file but REMEMBER to add it to `.gitignore` to prevent your key from leaking.

### Addendum (setting up yarn berry)

```
yarn set version berry
yarn
yarn plugin import interactive-tools
echo -e "nodeLinker: node-modules\n\n$(cat .yarnrc.yml)" > .yarnrc.yml
```

## TODO

- add observer HOC to all components for admin access.
- change proxyEvent to Proxy object.
- implement clean-publish.
