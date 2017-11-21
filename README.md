# npm-install-with-only

Only install SOME of the dependencies your package.json

## USAGE

```console
$ npm-install-with-only dep1 dep2
```

## DESCRIPTION

This filters the dependencies in your `package.json` to only include the
ones passed in on its command line, it then runs `npm install` for you. 
After `npm install` completes it restores your `pacakge.json`.

This is intended to allow folks to make better use of Docker caches.  So you
might do something like this:

```console
npm-install-with-only rarely-changing-module-1 rarely-changing-module-2
npm i
```

Or you might put your module list in a line-delimited file:

```console
npm-install-with-only $(cat rarely-chaging-modules)
npm i
```
