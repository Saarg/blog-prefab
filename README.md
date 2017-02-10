# BlogPrefab

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

BlogPrefab aims to be a simple and easy to use blog/websites for bands and small organizations.

## Development server
Run `node server` for a backend on port 8080.
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## production
ENV_VAR:
  MONGO_DB: default mongodb://localhost:27017/blog-prefab
  PORT: default 8080
  domain: default localhost

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

You only need server.js, package.json, dist/* and api/* on your production server.

Install the node modules with npm install

Run `node server.js` to start a prod server. you can set env var `MONGO_DB` to choose a different mongo url, `PORT` to change the port and `DOMAIN` to chose domain.
