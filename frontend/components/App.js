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
      .then((res) => this.setState({ todos: res.data.data }))
      .catch((err) => console.log(err));
  }

  addTodo = (todo) => {
    axios
      .post(URL, { name: todo, completed: false })
      .then((res) =>
        this.setState({ todos: [...this.state.todos, res.data.data] })
      )
      .catch((err) => console.log(err));
  };

  toggleTodo = (id) => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          todos: this.state.todos.map((todo) => {
            return todo.id === id ? res.data.data : todo;
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  toggleHideCompleted = () => {
    this.setState({ hideCompleted: !this.state.hideCompleted });
  };

  render() {
    return (
      <div>
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          hideCompleted={this.state.hideCompleted}
        />
        <Form addTodo={this.addTodo} />
        <button onClick={this.toggleHideCompleted}>
          {this.state.hideCompleted ? "Show Completed" : "Hide Completed"}
        </button>
      </div>
    );
  }
}
