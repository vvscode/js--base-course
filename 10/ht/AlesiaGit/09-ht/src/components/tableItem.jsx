import React, { Component } from "react";

class TableItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "none",
			coordX: "0px",
			coordY: "0px"
		};
	}

	showDescription = e => {
		this.setState({
			display: "block",
			coordX: e.clientX + "px",
			coordY: e.clientY + "px"
		});
	};

	hideDescription = () => {
		this.setState({
			display: "none",
			coordX: "0px",
			coordY: "0px"
		});
	};

	render() {
		return (
			<tr style={{ display: this.props.display }}>
				<td>{this.props.id}</td>
				<td>
					<div className="table-checkbox-wrapper">
						<input
							className="table-checkbox"
							type="checkbox"
							checked={this.props.done}
							onChange={() => this.props.toggleChecked(this.props.id)}
						/>
					</div>
				</td>
				<td
					onMouseOver={this.showDescription}
					onMouseOut={this.hideDescription}
				>
					{this.props.title}
					<span
						className="note-description"
						style={{
							display: this.state.display,
							left: this.state.coordX,
							top: this.state.coordY
						}}
					>
						{this.props.description}
					</span>
				</td>
				<td>{this.props.importance}</td>
				<td>{this.props.date}</td>
			</tr>
		);
	}
}

export default TableItem;
