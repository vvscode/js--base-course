import React, { Components } from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'semantic-ui-react';



class PopupExampleHtml extends Components {

    toggleDone = key => {
        this.setState({
            tasks: this.props.tasks.map(el => ({
                ...el,
                done: el.id === key ? !el.done : el.done
            }))
        });
    };

    // const TaskItem = (props) => (
    //     <Table.Row>
    //         <Table.Cell>
    //             <Input type="checkbox" checked={props.done} onClick={() => {
    //                 toggleDone(props.id)
    //             }} />
    //         </Table.Cell>
    //         <Table.Cell>
    //             {props.title}
    //         </Table.Cell>
    //         <Table.Cell>
    //             {props.priority}
    //         </Table.Cell>
    //         <Table.Cell>
    //             {props.date}
    //         </Table.Cell>
    //     </Table.Row>
    // )
    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    <Input type="checkbox" checked={this.props.tasks.done} onClick={() => {
                        this.toggleDone(this.props.tasks.id)
                    }} />
                </Table.Cell>
                <Table.Cell>
                    {this.props.tasks.title}
                </Table.Cell>
                <Table.Cell>
                    {this.props.tasks.priority}
                </Table.Cell>
                <Table.Cell>
                    {this.props.date}
                </Table.Cell>
            </Table.Row>

        );
    }
};

const mapStateToProps = state => ({
    tasks: state.todoReduser.tasks
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PopupExampleHtml);