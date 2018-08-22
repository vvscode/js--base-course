import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import AddTasks from "../components/AddTask";
import Filter from "../components/FilterForm";
import TasksList from "../components/TaskList";

import * as showDoneActions from '../actions/ShowDoneActions';
import * as tasksActions from '../actions/TasksActions';

class App extends Component {
    render() {

        const { showDone } = this.props;
        const { toggleShowDone } = this.props.showDoneActions;
        // const { toggleDone } = this.props.tasksActions;

        return (
            <div>
                <div className="ui column center page">
                    <Segment size='mini' inverted>
                        <Header as="h2" inverted color="grey">
                            Todo List ({showDone ? 'show done' : 'is not show done'})
                        </Header>
                    </Segment>
                    <Segment inverted>
                        <AddTasks />
                    </Segment>
                    <Segment inverted>
                        <Filter showDone={showDone} toggleShowDone={toggleShowDone} />
                    </Segment>
                    <TasksList  />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showDone: state.showDone.showDone
});

const mapDispatchToProps = (dispatch) => ({
    showDoneActions: bindActionCreators(showDoneActions, dispatch),
    tasksActions: bindActionCreators(tasksActions, dispatch)
});

App.propTypes = {
    showDone: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
