import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import { connect } from 'react-redux';

import AddTasks from "./AddTask";
import Filter from "./FilterForm";
import TasksList from "./TaskList/index";

class App extends Component {
    render() {
        return (
            <div>
                <div className="ui column center page">
                    <Segment inverted>
                        <Header as="h2" inverted color="grey">
                            Todo List ({this.props.state.todoReduser.showDone ? 'show done' : 'is not show done'})
                        </Header>
                    </Segment>
                    <Segment inverted>
                        <AddTasks />
                    </Segment>
                    <Segment inverted>
                        <Filter />
                    </Segment>
                    <TasksList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
