# Meal Planner
A meal planning app written entirely in Javascript.  [Node.js](http://nodejs.org) on the backend, [AngularJS](http://angularjs.org) and [RequireJS](http://requirejs.org) on the front end, and [MongoDB](http://mongodb.org) for the database.

## Production Site
You can visit the live site at [hasslefreemeals.net](http://www.hasslefreemeals.net).  Feel free
to mess around and report any bugs on Github Issues.

## Installation
All installation steps assume that you have [Homebrew](http://mxcl.github.com/homebrew/) installed.

### NodeJS
```
$ brew install node
```
### MongoDB
```
$ brew install mongodb
```
### App
```
$ git clone git://github.com/danielberkompas/meal-planner.git
$ cd meal-planner/
$ npm install
$ node app
```
Now visit `http://localhost:3000` and everything should be set up!

## Contributing
1. Fork the repo
2. Make your changes, submit pull request **including screenshots**. Use OSX's built in screenshot feature or [Skitch](http://evernote.com/skitch).
3. If you want attribution, include an update to the CHANGELOG.md file.  The project uses [Semantic Versioning](http://semver.org).

If you update the changelog, your update should look like this:

> ## Version X.X.X
> 2013/03/22
> 
> * @yourgithubhandle: {describe the change you made.}

You should also update the `package.json` to match the new version number.  Continuous integration is set up, so your pull request will be pushed live after it is approved automatically, which makes some of these steps necessary.
