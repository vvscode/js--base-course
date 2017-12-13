import React, { Component } from "react";

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: Date.now(),
			done: false,
			title: "",
			description: "",
			importance: "1",
			date: "2017-12-12"
		};
	}

	handleChange = e => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.addNewTask(this.state);
		this.setState({
			id: Date.now(),
			done: false,
			title: "",
			description: "",
			importance: "1",
			date: "2017-12-12"
		});
	};

	render() {
		return (
			<div>
				<form
					className="form"
					ref={form => (this.form = form)}
					onSubmit={this.handleSubmit}
				>
					<div className="form-title">Form</div>
					<div className="form-top-wrapper">
						<label className="input-wrapper">
							Note title
							<input
								className="form-input"
								type="text"
								placeholder="Title..."
								name="title"
								value={this.state.title}
								onChange={this.handleChange}
							/>
						</label>
						<label className="input-wrapper">
							Set importance
							<select
								className="form-input"
								value={this.state.importance}
								name="importance"
								onChange={this.handleChange}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
							</select>
						</label>
						<label className="input-wrapper">
							Select date
							<input
								className="form-input"
								type="date"
								value={this.state.date}
								name="date"
								onChange={this.handleChange}
							/>
						</label>
					</div>
					<div className="form-description-wrapper">
						<textarea
							className="form-textarea"
							value={this.state.description}
							name="description"
							onChange={this.handleChange}
						/>
					</div>
					<input
						className="form-button"
						type="submit"
						value="Add"
						onSubmit={this.handleSubmit}
					/>
				</form>
			</div>
		);
	}
}

export default Form;
