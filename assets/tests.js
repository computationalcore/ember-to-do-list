'use strict';

define("ember-to-do-list/tests/helpers/create-offline-ref", ["exports", "firebase"], function (_exports, _firebase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createOfflineRef;

  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */
  function createOfflineRef(initialData, url = 'https://emberfire-tests-2c814.firebaseio.com', apiKey = 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o') {
    if (!_firebase.default._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    const config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };
    let app;

    try {
      app = _firebase.default.app();
    } catch (e) {
      app = _firebase.default.initializeApp(config);
    }

    const ref = app.database().ref();
    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define("ember-to-do-list/tests/helpers/destroy-firebase-apps", ["exports", "firebase"], function (_exports, _firebase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = destroyFirebaseApps;
  const {
    run
  } = Ember;
  /**
   * Destroy all Firebase apps.
   */

  function destroyFirebaseApps() {
    const deletions = _firebase.default.apps.map(app => app.delete());

    Ember.RSVP.all(deletions).then(() => run(() => {// NOOP to delay run loop until the apps are destroyed
    }));
  }
});
define("ember-to-do-list/tests/helpers/replace-app-ref", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = replaceAppRef;

  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */
  function replaceAppRef(app, ref, model = 'application') {
    app.register('service:firebaseMock', ref, {
      instantiate: false,
      singleton: true
    });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define("ember-to-do-list/tests/helpers/replace-firebase-app-service", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = replaceFirebaseAppService;

  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */
  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, {
      instantiate: false,
      singleton: true
    });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define("ember-to-do-list/tests/helpers/stub-firebase", ["exports", "firebase"], function (_exports, _firebase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = stubFirebase;

  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */
  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase.default._unStub) {
      var originalSet = _firebase.default.database.Reference.prototype.set;
      var originalUpdate = _firebase.default.database.Reference.prototype.update;
      var originalRemove = _firebase.default.database.Reference.prototype.remove;

      _firebase.default._unStub = function () {
        _firebase.default.database.Reference.prototype.set = originalSet;
        _firebase.default.database.Reference.prototype.update = originalUpdate;
        _firebase.default.database.Reference.prototype.remove = originalRemove;
      };

      _firebase.default.database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);

        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);

        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);

        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define("ember-to-do-list/tests/helpers/unstub-firebase", ["exports", "firebase"], function (_exports, _firebase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = unstubFirebase;

  function unstubFirebase() {
    if (typeof _firebase.default._unStub === 'function') {
      _firebase.default._unStub();

      delete _firebase.default._unStub;
    }
  }
});
define("ember-to-do-list/tests/integration/helpers/format-date-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | format-date', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "o76SOcjR",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"format-date\",[[23,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define("ember-to-do-list/tests/integration/helpers/format-markdown-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | format-markdown', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WHfRC8ef",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"format-markdown\",[[23,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define("ember-to-do-list/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/todos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/todos.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/todos/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/todos/edit.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/todos/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/todos/new.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/format-date.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-date.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/format-markdown.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-markdown.js should pass ESLint\n\n');
  });
  QUnit.test('models/todo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/todo.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/todos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/todos.js should pass ESLint\n\n');
  });
  QUnit.test('routes/todos/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/todos/edit.js should pass ESLint\n\n');
  });
  QUnit.test('routes/todos/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/todos/new.js should pass ESLint\n\n');
  });
});
define("ember-to-do-list/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('ember-to-do-list/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-to-do-list/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('ember-to-do-list/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-to-do-list/templates/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('ember-to-do-list/templates/todos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-to-do-list/templates/todos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('ember-to-do-list/templates/todos/edit.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-to-do-list/templates/todos/edit.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('ember-to-do-list/templates/todos/new.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-to-do-list/templates/todos/new.hbs should pass TemplateLint.\n\n');
  });
});
define("ember-to-do-list/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('integration/helpers/format-date-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/format-date-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/format-markdown-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/format-markdown-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/todos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/todos-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/todos/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/todos/edit-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/todos/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/todos/new-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/models/todo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/todo-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/todos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/todos-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/todos/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/todos/edit-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/todos/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/todos/new-test.js should pass ESLint\n\n');
  });
});
define("ember-to-do-list/tests/test-helper", ["ember-to-do-list/app", "ember-to-do-list/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("ember-to-do-list/tests/unit/controllers/todos-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | todos', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:todos');
      assert.ok(controller);
    });
  });
});
define("ember-to-do-list/tests/unit/controllers/todos/edit-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | todos/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:todos/edit');
      assert.ok(controller);
    });
  });
});
define("ember-to-do-list/tests/unit/controllers/todos/new-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | todos/new', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:todos/new');
      assert.ok(controller);
    });
  });
});
define("ember-to-do-list/tests/unit/models/todo-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | todo', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('todo', {});
      assert.ok(model);
    });
  });
});
define("ember-to-do-list/tests/unit/routes/todos-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | todos', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:todos');
      assert.ok(route);
    });
  });
});
define("ember-to-do-list/tests/unit/routes/todos/edit-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | todos/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:todos/edit');
      assert.ok(route);
    });
  });
});
define("ember-to-do-list/tests/unit/routes/todos/new-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | todos/new', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:todos/new');
      assert.ok(route);
    });
  });
});
define('ember-to-do-list/config/environment', [], function() {
  var prefix = 'ember-to-do-list';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('ember-to-do-list/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
