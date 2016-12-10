import React, { Component, PropTypes, } from 'react';

export default class RadioButton extends Component {
    static get propTypes() {
        return {
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            isChecked: PropTypes.bool
        }
    }

    render() {
        let radioButton;
        if (this.props.isChecked)
            radioButton = <input type="radio" className="form-check-input" name={this.props.name} value={this.props.value} defaultChecked={true} />
        else
            radioButton = <input type="radio" className="form-check-input" name={this.props.name} value={this.props.value} />

        return (
            <div className="form-check">
                <label className="form-check-label">
                    {radioButton}  {this.props.label}
                </label>
            </div>
        )
    }
}