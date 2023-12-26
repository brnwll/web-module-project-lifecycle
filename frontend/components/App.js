import React from "react";
import TodoList from "./TodoList";
import Form from "./Form";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      hideCompleted: false,
    };
  }

  componentDidMount() {
    axios
      .get(URL)
      .then((res) => this.setState({ ...this.state, todos: res.data.data }))
      .catch((err) => console.log(err));
  }

  addTodo = (todo) => {
    axios
      .post(URL, { name: todo, completed: false })
      .then((res) =>
        this.setState({
          ...this.state,
          todos: [...this.state.todos, res.data.data],
        })
      )
      .catch((err) => console.log(err));
  };

  toggleTodo = (id) => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((todo) => {
            return todo.id === id ? res.data.data : todo;
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  hideShowCompleted = () => {
    this.setState({ ...this.state, hideCompleted: !this.state.hideCompleted });
  };

  render() {
    return (
      <div>
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          hideCompleted={this.state.hideCompleted}
        />
        <Form
          addTodo={this.addTodo}
          hideShowCompleted={this.hideShowCompleted}
          hideCompleted={this.state.hideCompleted}
        />
      </div>
    );
  }
}
