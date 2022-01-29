import React, { Component } from 'react';
import { TextField, FormControlLabel, RadioGroup, Radio, FormLabel, FormControl, Checkbox, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import './todo.css'
import DateFnsUtils from '@date-io/date-fns';
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from '../redux/actions';
import Table from './table';

const initialState = {
    user: "",
    radio: "male",
    selectedDate: new Date('2022-01-29T21:11:54'),
    status: "active",
    reading: true,
    sports: false,
    music: false,
    task: "",
    range: 20
}

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    handleChange = (e) => {
        this.setState({ radio: e.target.value })
    };
    handleCheck = (e) => {
        this.setState({ [e.target.name]: e.target.checked })
    };
    handleUser = (e) => {
        let regex = /^[A-Za-z ]{1,15}$/

        if (regex.test(e.target.value)) {
            this.setState({ user: e.target.value })
        } else {
            alert('username should only be in alphabet with less than 15 character')
        }
    };
    handleDateChange = (date) => {
        this.setState({ selectedDate: date })
    }
    handleSubmit = () => {
        let { user, radio, selectedDate, status, reading, sports, music, task, range } = this.state
        if (this.state.task) {
            this.props.dispatch(
                addTask({
                    id: uuidv4(),
                    user,
                    radio,
                    selectedDate,
                    status,
                    reading,
                    sports,
                    music,
                    task,
                    range
                })
            );
            this.setState(initialState)
        }
        else {
            alert('add task name')
        }
    }
    handleTask = (e) => {
        this.setState({ task: e.target.value })
    }
    handleRange = (e) => {
        this.setState({ range: e.target.value })
    }
    handleStatus = (e) => {
        this.setState({ status: e.target.value })
    }
    render() {
        return (
            <div>
                <div className='center'>
                    <h2>To do List</h2>
                    <TextField id="standard-basic" label="username" value={this.state.user} onChange={this.handleUser} />
                    <br/>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={this.state.radio} onChange={this.handleChange}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <FormLabel component="legend">Hobby</FormLabel>
                        <br/>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.sports}
                                    onChange={this.handleCheck}
                                    name="sports"
                                    color="primary"
                                />
                            }
                            label="Sports"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.reading}
                                    onChange={this.handleCheck}
                                    name="reading"
                                    color="primary"
                                />
                            }
                            label="Reading"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.music}
                                    onChange={this.handleCheck}
                                    name="music"
                                    color="primary"
                                />
                            }
                            label="Music"
                        />
                    </div>
                    <TextField id="standard-basic" label="Age ( 18 to 55 )" onChange={this.handleRange} value={this.state.range} type="range" min="18" max="28" />
                    <TextField id="standard-basic" label="taskname" value={this.state.task} onChange={this.handleTask} required />
                    <br/>
                    <div style={{alignSelf:"start"}}>
                        <InputLabel id="demo-simple-select-label" style={{display:"inline",marginRight:'30px'}}>Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.status}
                            onChange={this.handleStatus}
                            style={{width:'100px'}}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">InActive</MenuItem>
                        </Select>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select Date"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Button onClick={this.handleSubmit} variant="contained" color="primary">ADD</Button>
                    {console.log("this.props.tasks===>", this.props.tasks)}
                </div>
                <br />
                <br />
                <br />
                <Table />
            </div>);
    }
}

export default connect()(Todo);