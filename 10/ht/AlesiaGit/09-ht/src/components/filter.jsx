import React, { Component } from "react";

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hideCompleted: false,
			startDate: "2000-01-01",
			endDate: "2020-12-31",
			searchText: ""
		};
	}

	handleSearch = e => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === "hideCompleted") value = !this.state.hideCompleted;
		this.setState(
			{
				[name]: value
			},
			() => {
				this.props.filterResults(this.state);
			}
		);
	};

	render() {
		return (
			<div>
				<form className="form">
					<div className="form-title">Filter</div>
					<div className="form-top-wrapper">
						<label className="input-wrapper">
							Hide completed
							<input
								className="form-checkbox"
								type="checkbox"
								checked={this.state.hideCompleted}
								name="hideCompleted"
								onChange={this.handleSearch}
							/>
						</label>
						<label className="input-wrapper">
							From date
							<input
								className="form-input"
								type="date"
								value={this.state.startDate}
								name="startDate"
								onChange={this.handleSearch}
							/>
						</label>
						<label className="input-wrapper">
							To date
							<input
								className="form-input"
								type="date"
								value={this.state.endDate}
								name="endDate"
								onChange={this.handleSearch}
							/>
						</label>
					</div>
					<div className="form-description-wrapper">
						<label className="search-text-label">
							Search word
							<input
								className="search-text-input"
								type="text"
								value={this.state.searchText}
								name="searchText"
								onChange={this.handleSearch}
							/>
						</label>
					</div>
				</form>
			</div>
		);
	}
}

export default Filter;
