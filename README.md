# ember-to-do-list
A simple To-Do List EmberJS application using Firebase for persistence. 
The todo body accepts [Markdown](https://www.markdownguide.org/basic-syntax/) syntax.
It is my implementation of the last in-class project on the [Build Web Apps Using EmberJS: The Complete Course](https://www.udemy.com/build-web-apps-using-emberjs-the-complete-course).

![](https://github.com/computationalcore/ember-to-do-list/raw/assets/ember-to-do.png)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd ember-to-do-list`
* `npm install`

## Setup Firebase Credentials

You will need to create a (Firebase app)[https://firebase.google.com/] and replace the
credentials at config/environment.js.
```javascript
firebase: {
    apiKey: "YOUR-API-KEY",
    authDomain: "YOUR-FIREBASE-APP.firebaseapp.com",
    databaseURL: "https://YOUR-FIREBASE-APP.firebaseio.com",
    storageBucket: "YOUR-FIREBASE-APP.appspot.com"
  }
```

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Notes

At the time of this project development, the stable version of [emberfire](https://github.com/firebase/emberfire), the 
official Firebase adapter, only supports EmberJS 3.4.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments
* [Udemy](https://www.udemy.com)
* [Eduonix Learning Solutions](https://www.udemy.com/user/eduonix/)
