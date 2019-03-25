import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    editTodo(id) {
      const self = this;

      const title = this.get('model.title');
      const body = this.get('model.body');
      const date = this.get('model.date');

      this.store.findRecord('todo', id).then(function(todo) {
        todo.set('title', title);
        todo.set('body', body);
        todo.set('date', new Date(date));

        //Save to Firebase
        todo.save();

        self.transitionToRoute('todos');
      });
    },
    deleteTodo(id) {
      const self = this;

      this.store.findRecord('todo', id).then(function(todo) {
        todo.deleteRecord();
        //Save to Firebase
        todo.save();
        self.transitionToRoute('todos');
      });

    }
  }
});
