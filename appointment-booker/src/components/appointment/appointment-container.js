import React, { Component } from 'react';

import CountryCodes from './country-codes'

import { bookAppointment as BookAppointment } from '../../services/appointment-service'

import AppointmentView from './appointment-view'
import { Link } from 'react-router-dom';

class Appointment extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+20',
        phoneNumber: '',
        operationCountries: '',
        companyName: '',
        objective: '',
        description: '',
        openedMenu: '',
        booked: false
    }

    requestAppointment = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            this.bookAppointment();
        }
    }

    bookAppointment = () => {
        const appointmentInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            countryCode: this.state.countryCode,
            phoneNumber: this.state.phoneNumber,
            operationCountries: this.state.operationCountries,
            companyName: this.state.companyName,
            objective: this.state.objective,
            description: this.state.description
        }

        BookAppointment(appointmentInfo)
            .then(() => {
                this.setState({ booked: true })
            }).catch((err) => {
                console.log(err);
            });
    }

    // todo find a better way in react to check for form validation
    validateForm = () => {
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        const emailValidation = new RegExp(re).test(this.state.email);
    
        let validForm = true;
    
        // todo find an API to check for phoneNumbers
        if (this.state.phoneNumber.length === 10 || this.state.phoneNumber.length === 11) {
            this.setState({ validPhoneNumber: true });
        } else {
            this.setState({ validPhoneNumber: false });
            validForm = false;
        }
    
        if (emailValidation) {
            this.setState({ validEmail: true });
        } else if (this.state.email.length > 0) {
            this.setState({ validEmail: false });
            validForm = false;
        } else {
            this.setState({ validEmail: false });
            validForm = false;
        }

        if (this.state.firstName.length > 1) {
            this.setState({ validFirstName: true })
        } else {
            this.setState({ validFirstName: false })
            validForm = false
        }

        if (this.state.lastName.length > 1) {
            this.setState({ validLastName: true })
        } else {
            this.setState({ validLastName: false })
            validForm = false
        }

        if (this.state.operationCountries.length > 0) {
            this.setState({ validOperationCountries: true })
        } else {
            this.setState({ validOperationCountries: false })
            validForm = false
        }

        if (this.state.companyName.length > 0) {
            this.setState({ validCompanyName: true })
        } else {
            this.setState({ validCompanyName: false })
            validForm = false
        }

        if (this.state.objective.length > 0) {
            this.setState({ validObjective: true })
        } else {
            this.setState({ validObjective: false })
            validForm = false
        }

        if (this.state.description.length > 0) {
            this.setState({ validDescription: true })
        } else {
            this.setState({ validDescription: false })
            validForm = false
        }
    
        return validForm;
    }

    setOpenedMenu = (name) => {
        this.setState({ openedMenu: name })
    }

    handleChange = (event) => {
        let name, value = '';

        if (event === null) {
            this.setState({ [this.state.openedMenu]: '' });
            return;
        }

        if (!event.target) {
            if(event[0]) {
                if (event[0].name)
                    name = event[0].name;
                else
                    name = this.state.openedMenu;

                event.forEach(element => {
                    if (value !== '')
                        value += ', '
                    value += element.value;
                });
            } else {
                if (event.name)
                    name = event.name;
                else 
                    name = this.state.openedMenu;
                value = event.value;
            }
        } else {
            name = event.target.name;
            value = event.target.value
        }

        this.setState({[name]: value});
    }
    
    render() {
        
        const countryOptions = [
            { value: 'country1', name: 'operationCountries', label: 'Country1' },
            { value: 'country2', name: 'operationCountries', label: 'Country2' },
            { value: 'country3', name: 'operationCountries', label: 'Country3' }
        ]

        const companyOptions = [
            { value: 'company1', name: 'companyName', label: 'Company1' },
            { value: 'company2', name: 'companyName', label: 'Company2' },
            { value: 'company3', name: 'companyName', label: 'Company3' }
        ]

        const objectiveOptions = [
            { value: 'complaint', name: 'objective', label: 'Complaint' },
            { value: 'suggestion', name: 'objective', label: 'Suggestion' }
        ]

        const countryCodesOptions = CountryCodes.map((code, index) => {
            return (
                <option key={index} value={code.dial_code}>
                    {`${code.code} ${code.dial_code}`} 
                </option>
            );
        });

        if (this.state.booked)
            return (
                <div>
                    <Link to="/">
                        Go to Home page
                    </Link>
                </div>
            )
        
        return (
            <AppointmentView
                requestAppointment={this.requestAppointment} 
                handleChange={this.handleChange}
                setOpenedMenu={this.setOpenedMenu}
                countryOptions={countryOptions}
                countryCodesOptions={countryCodesOptions}
                companyOptions={companyOptions}
                objectiveOptions={objectiveOptions}
                state={this.state}
            />
        );
    }
}

export default Appointment;
