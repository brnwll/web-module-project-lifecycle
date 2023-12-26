import React from "react";

export default class Todo extends React.Component {
  handleClick = () => {
    this.props.toggleTodo(this.props.todo.id);
  };
  render() {
    return (
      <>
        {this.props.hide ? null : (
          <li className="todo" onClick={this.handleClick}>
            {this.props.todo.name}
            {this.props.todo.completed ? " ✔️" : ""}
          </li>
        )}
      </>
    );
  }
}
