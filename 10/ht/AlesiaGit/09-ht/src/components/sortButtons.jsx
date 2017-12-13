import React, { Component } from "react";

class SortButtons extends Component {
	render() {
		let columnName = this.props.columnName;

		return (
			<div className="btn-wrapper">
				<button
					className="btn btn-up"
					onClick={() =>
						this.props.sortColumn("AtoZ", { columnName })}
				/>
				<button
					className="btn btn-down"
					onClick={() =>
						this.props.sortColumn("ZtoA", { columnName })}
				/>
			</div>
		);
	}
}

export default SortButtons;
