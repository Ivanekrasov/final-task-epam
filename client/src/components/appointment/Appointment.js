import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAppointment } from '../../actions/appointmentActions';

class AddAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            date: '',
            time: '',
            errors: {},
            disabled: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const expData = {
            name: this.state.name,
            phone: this.state.phone,
            date: this.state.date.concat('T',this.state.time,':00Z')

        };

        this.props.addAppointment(expData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { errors } = this.state;

        return (
            <div className="add-appointment">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Appointment</h1>
                            <p className="lead text-center">
                                Add new appointment
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    placeholder="* Phone number"
                                    name="phone"
                                    type="tel"
                                    pattern='\d{1}[0-9]{3}[0-9]{7}'
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    error={errors.phone}
                                />
                                <h6>Choose Date</h6>
                                <TextFieldGroup
                                    name="date"
                                    type="date"
                                    value={this.state.date}
                                    onChange={this.onChange}
                                    error={errors.date}
                                />
                                <TextFieldGroup
                                    name="time"
                                    type="time"
                                    value={this.state.time}
                                    onChange={this.onChange}
                                    error={errors.time}
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddAppointment.propTypes = {
    addAppointment: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { addAppointment })(
    withRouter(AddAppointment)
);
