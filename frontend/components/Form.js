import React from "react";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.todo) return;
    this.props.addTodo(this.state.todo.trim());
    this.setState({ todo: "" });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="todo"
          type="text"
          placeholder="Type todo"
          value={this.state.todo}
          onChange={this.onChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}
