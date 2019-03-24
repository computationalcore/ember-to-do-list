import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    addTodo() {
      const date = this.get('date');
      const title = this.get('title');
      const body = this.get('body');

      // Create New Todo
      const newTodo = this.store.createRecord('todo', {
        date: new Date(date),
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
