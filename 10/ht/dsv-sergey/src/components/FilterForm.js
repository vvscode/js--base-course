import React from 'react';
import { Form, Input, Header, Divider } from 'semantic-ui-react';
// import { connect } from 'react-redux';

// import { toggleCheck } from '../actions/TasksActions';
// import { toggleShowDone } from '../actions/ShowDoneActions';

class Filter extends React.Component {

    // toggleShDone(ev) {
    //     // debugger;
    //     const { toggleShowDone } = this.props;
    //     this.props.toggleShowDone(!ev.target.checked);
    // }

	render() {

        const { showDone } = this.props;
        const { toggleShowDone } = this.props;

		return (
			<Form size='mini' inverted label="Filter">
				<Header inverted as="h3" color="grey">
					Filter:
				</Header>
				<Divider inverted />
				<Form.Group widths="equal">
					<Form.Checkbox
						checked={showDone}
						onChange={() => toggleShowDone(showDone)}
                        label="Show completed"
					/>
					<Form.Input placeholder="Date From" name="date" type="date" />
					<Form.Input placeholder="Date To" name="date" type="date" />
				</Form.Group>
				<Input fluid size="small" icon="search" placeholder="Text search (title + description)" />
			</Form>
		);
	}
}

// const mapStateToProps = (state) => ({
// 	showDone: state.showDone
// });

// const mapDispatchToProps = (dispatch) => ({
// 	toggleCheck: (check) => dispatch(toggleCheck(check)),
// 	toggleShowDone: () => dispatch(toggleShowDone())
// });

export default Filter;
