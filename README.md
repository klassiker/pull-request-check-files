# pull-request-check-files

## About

This action checks that only paths matching glob patterns from a config file are modified for a pull-request.

## Usage

```yaml
- name: Run action
  uses: klassiker/pull-request-check-files@main
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Config

Config has to be located in `pr-allowed.txt`.

```
src/*
src/main/**/*.java
```

Extended glob patterns are available. Please take a look at [Minimatch](https://github.com/isaacs/minimatch).