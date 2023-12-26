import React from "react";
import TodoList from "./TodoList";
import Form from "./Form";
import axios from "axios";

const URL = "http://localhost:9000/api/todosX";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      hideCompleted: false,
      error: "",
    };
  }

  componentDidMount() {
    axios
      .get(URL)
      .then((res) => this.setState({ ...this.state, todos: res.data.data }))
      .catch((err) =>
        this.setState({ ...this.state, error: err.response.data.message })
      );
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
      .catch((err) =>
        this.setState({ ...this.state, error: err.response.data.message })
      );
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
      .catch((err) =>
        this.setState({ ...this.state, error: err.response.data.message })
      );
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
        {this.state.error && <p>{this.state.error}</p>}
        <Form
          addTodo={this.addTodo}
          hideShowCompleted={this.hideShowCompleted}
          hideCompleted={this.state.hideCompleted}
        />
      </div>
    );
  }
}
