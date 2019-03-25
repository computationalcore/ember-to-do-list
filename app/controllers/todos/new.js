import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({
  actions: {
    addTodo() {
      const date = this.get('date');
      const title = this.get('title');
      const body = this.get('body');

      // Create New Todo
      const newTodo = this.store.createRecord('todo', {
        date: moment(date),
        title,
        body
      });

      // Save to firebase
      newTodo.save();

      // Clear
      this.setProperties({
        title: '',
        body: '',
        date: ''
      });
    }
  }
});
