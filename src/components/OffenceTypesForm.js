import React, { Component, PropTypes, } from 'react';

export default class OffenceTypesForm extends Component {
    static get propTypes() {
        return {
            crimes: PropTypes.array.isRequired,
        }
    }

    render() {
        return (
            <fieldset id="offence-types">
                <legend hidden>offence types</legend>
                {this.props.crimes.map(x => (
                    <div key={x.value} className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" name="offencetypes" className="form-check-input" value={x.value} defaultChecked /> {x.name}
                            {(() => {
                                if (x.solved > 0)
                                    return <span className="text-success">{x.solved}</span>
                            })()}
                            {(() => {
                                if (x.unsolved > 0)
                                    return <span className="text-danger">{x.unsolved}</span>
                            })()}
                        </label>
                    </div>
                ))}
            </fieldset>
        )
    }
}

