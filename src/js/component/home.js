import React from "react";

//create your first component

export class Home extends React.Component {
	constructor() {
		super();
		//we declare the initial array of objects
		this.state = {
			todos: [
				{ done: false, task: "First task", id: Math.random() * 10 },
				{ done: false, task: "Second task", id: Math.random() * 10 },
				{ done: false, task: "Third task", id: Math.random() * 10 }
			],
			newTask: ""
		};
	}
	addTask(e) {
		e.preventDefault();
		this.setState({
			todos: this.state.todos.concat([
				{
					done: false,
					task: this.state.newTask,
					id: Math.random() * 10
				}
			])
		});
		return false;
	}
	deleteTask(id) {
		this.setState({
			todos: this.state.todos.filter(task => task.id != id) //returns all the task but the one that we want to eliminate
		});
	}

	render() {
		//Iterates through the state object to add the elements to a table
		let todoList = this.state.todos.map(task => {
			return (
				// returns the task in a lable and a button that calls the function deleteTask when clicked
				<li className="list-group-item d-flex" key={task.id}>
					<label>{task.task}</label>
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
			//section 1 is the header
			//section 2 imputs the task
			//section 3 shows the to-do list
			<div className="container">
				<div className="row h-100">
					<div className="col-10 mx-auto ">
						<div className="col-10 mx-auto">
							<section>
								<div className="jumbotron jumbotron-fluid m-0 bg-secondary">
									<div className="container">
										<h1 className="display-4 text-white text-center">
											To-do List
										</h1>
									</div>
								</div>
							</section>
							<section>
								<form
									className="form-inline"
									onSubmit={this.addTask.bind(this)}>
									<div className="col-10 form-group px-0">
										<input
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
									</div>
									<button
										type="submit"
										className="col-2 btn btn-success">
										Add!
									</button>
								</form>
							</section>
							<section>
								<ul className="list-group">{todoList}</ul>
							</section>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
