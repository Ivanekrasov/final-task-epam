import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Barbershop</h1>
                                <p className="lead">
                                    {' '}
                                    Floyd's Hair Styling for Men, barber shop in Saint Petersburg
                                    <br/>
                                    <b>If you don't look good, we don't look good.</b>
                                </p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="btn btn-lg btn-light">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
