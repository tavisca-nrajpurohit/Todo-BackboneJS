
const TodoItem = Backbone.Model.extend();

const TodoList = Backbone.Collection.extend({
    model: TodoItem,
    url: 'http://demo8483055.mockable.io/todoList',
    parse: function(response) {
        return response;
      }
});

let todoList = new TodoList();
todoList.fetch({
	success: function(response) {
		 console.log("Data loaded from API");
		//  console.log(todoList);
	},
	error: function (errorResponse) {
        console.log("Error occurred while loading data from API");
        console.log(errorResponse);
        todoList = new TodoList([
                new TodoItem( { text:'Buy Vegetables from the Market', status:'Todo' } ),
                new TodoItem( { text:'Buy Fruits from the Super-Market', status:'Todo' } ),
                new TodoItem( { text:'Buy Stationery', status:'Done' } ),
                new TodoItem( { text:'Buy Vehicles from the Auto Store', status:'Todo' } ),
            ]);
	}
});

const TodoItemView = Backbone.View.extend({
    template: JST["list-item"],
    attributes : function () {
        return {
        class: "todo-item-"+this.model.get('status'),
        id : "item-" + this.model.cid
        };
      },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        console.log(this.model.cid);
        return this;
    }
});

const TodoListView = Backbone.View.extend({
    render: function() {
        this.model.each(item => {
            const todoItemView = new TodoItemView({ model: item});
            this.$el.append(todoItemView.render().$el);
        });
        return this;
    },
    initialize: function() {
        this.model.on('add', this.onListChange, this)
        this.model.on('remove', this.onListRemove, this);
    },
    onListChange: function(item) {
        const todoItemView = new TodoItemView({ model: item });
        this.$el.append(todoItemView.render().$el);
    },
    onListRemove: function(item){
    }
});

const todoListView = new TodoListView({ el: '#container' , model: todoList });
todoListView.render();