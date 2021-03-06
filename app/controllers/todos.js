import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  filter: '',
  // eslint-disable-next-line ember/no-function-prototype-extensions
  filteredTodos: function() {
    const filter = this.get('filter');
    const rx = new RegExp(filter, 'gi');
    const todos = this.model;

    return todos.filter(function(todo) {
      return todo.get('title').match(rx) || todo.get('body').match(rx);
    });
  }.property('arrangedContent', 'filter'),
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  sortedProperties: ['date:asc'],
  sortedTodos: computed.sort('model', 'sortedProperties')
});
