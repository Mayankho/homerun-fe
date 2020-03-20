import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, Icon, Input, Modal, Button, Dropdown, Label } from 'semantic-ui-react';

import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import SwipeLeft from './SwipeLeft';
import SwipeRight from './SwipeRight.js';

import Assign from './AssignUserButton.js';
import { DeleteTodoModal } from './DeleteTodoModal.js';
import axiosWithAuth from '../../../utils/AxiosWithAuth';



const Todo = props => {

    const { task } = props

    const [modalOpen, setModalOpen] = useState(false);
    const [assigned, setAssigned] = useState([])
    const [assignees, setAssignees] = useState([])

    const addSelection = e => {
        let selection = e.target.value
        if (!assigned.includes(selection)) {
            setAssigned([...assigned, selection])
        } else {
            return null
        }
    }
    const removeSelection = (selection) => {
        if (assigned.includes(selection)) {
            setAssigned(assigned.filter(element => element !== selection))
        } else {
            throw new Error()
        }
    }

    useEffect(() => {
        axiosWithAuth().get(`/members/household/assignable`)
            .then(res => setAssignees(res.data))
            .catch(err => console.log(err.message))
    }, [assigned])

    return (
        <>
            <DeleteTodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <List.Item className='todo'>
                <SwipeableListItem
                    threshold={0.50}
                    swipeLeft={{
                        content: <SwipeLeft />,
                        action: () => setModalOpen(true)
                    }}
                    swipeRight={{
                        content: <SwipeRight />,
                        action: () => console.log('Working')
                    }}
                >
                    <List.Content className='todo-container'>

                        <div className='todo-left'>
                            <List.Header as='a'>{props.task.title} </List.Header>
                            <List.Header as={'h5'}>Due {props.task.due}</List.Header>
                        </div>
                        <div className='todo-right'>
                            {assigned.map((selection, index) => {
                                return <Label circular key={index} onClick={() => removeSelection(selection)}>{selection} <Icon style={{ paddingLeft: "4px" }} name='remove circle' /></Label>
                            })}
                            <div className="ui buttons">
                                <select className="ui floating dropdown button" onChange={addSelection}>
                                    {assignees.map((member, index) => {
                                        return <option key={index} value={member.username}>{member.username}</option>
                                    })}
                                </select>
                            </div>

                            <Button className="circular ui button" >
                                <i className="icon settings" />
                            </Button>

                        </div>
                    </List.Content>
                </SwipeableListItem>
            </List.Item>
        </>
    )
}

export default Todo;