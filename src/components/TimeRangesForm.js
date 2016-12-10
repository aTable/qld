import React, { Component } from 'react';
import RadioButton from './RadioButton';

export default class TimeRangesForm extends Component {
    render() {
        return (
            <div className="form-group">
                <RadioButton name="timeranges" value="week" label="last week" />
                <RadioButton name="timeranges" value="month" label="last month" isChecked />
                <RadioButton name="timeranges" value="year" label="last year" />
            </div>
        );
    }
}