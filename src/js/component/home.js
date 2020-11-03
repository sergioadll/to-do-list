import React from "react";
import { element } from "prop-types";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		//we declare the initial array of objects
		this.state = {
			todos: [],
			newTask: "",
			baseUrl: "https://assets.breatheco.de/apis/fake/todos/user/sergio"
		};
		this.todos = [];
	}
	async loadTodos() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};
		try {
			let res = await fetch(this.state.baseUrl, requestOptions);
			let result = await res.json();
			let todoList = result.map((element, index) => {
				element.id = index;
				return element;
			});
			this.state.todos = todoList;
			console.log(todoList);
		} catch (error) {
			console.log("error", error);
		}
	}
	async modifyTodos() {
		var requestOptions = {
			method: "PUT",
			body: JSON.stringify(this.state.todos),
			headers: { "Content-Type": "application/json" },
			redirect: "follow"
		};
		try {
			let res = await fetch(this.state.baseUrl, requestOptions);
			let result = await res.json();
			console.log("try", this.state.todos);
			console.log(result);
		} catch (error) {
			console.log("error", error);
		}
	}
	componentDidMount() {
		this.loadTodos();
	}
	addTask(e) {
		e.preventDefault();

		this.setState({
			todos: this.state.todos.concat([
				{
					label: this.state.newTask,
					done: false,
					id: Math.random() * 10
				}
			]),
			newTask: ""
		});
		this.modifyTodos();
		return false;
	}
	deleteTask(id) {
		this.setState({
			todos: this.state.todos.filter(task => task.id != id) //returns all the task but the one that we want to eliminate
		});
		let todos = this.state.todos;
		this.modifyTodos(todos);
	}

	render() {
		//Iterates through the state object to add the elements to a table
		let todoList = this.state.todos.map(task => {
			return (
				// returns the task in a lable and a button that calls the function deleteTask when clicked
				<li className="list-group-item d-flex" key={task.id}>
					<label>{task.label}</label>
					<button
						type="submit"
						className="btn btn-danger btn-sm py-0 ml-auto"
						onClick={() => this.deleteTask(task.id)}>
						X
					</button>
				</li>
			);
		});
		return (
			<div className="container">
				<h1 className="display-4 ext-center">To-do List</h1>
				<div className="d-flex">
					<input
						id="input"
						type=""
						className="form-control w-100"
						placeholder="Task example"
						value={this.state.newTask} //we assign newTask to value
						onChange={e =>
							this.setState({
								newTask: e.target.value
							})
						} //the event updates the component so newTask gets value's value
					/>
					<button
						type="submit"
						className="col-2 btn btn-success"
						onClick={this.addTask.bind(this)}>
						Add!
					</button>
				</div>
				<ul className="list-group">{todoList}</ul>
			</div>
		);
	}
}
