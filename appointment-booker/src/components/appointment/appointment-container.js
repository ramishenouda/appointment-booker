import React, { Component } from 'react';
import * as Notify from '../../services/sweetalert-service'
import { checkValidation as NumVerify } from '../../services/numverify-service'

import CountryCodes from './country-codes'

import { bookAppointment as BookAppointment } from '../../services/appointment-service'

import AppointmentView from './appointment-view'

class Appointment extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        countryCode: 'EG',
        phoneNumber: '',
        operationCountries: '',
        companyName: '',
        objective: '',
        description: '',
        openedMenu: '',
        chooseCompany: false,
        booked: false,
        booking: false
    }

    requestAppointment = (event) => {
        event.preventDefault();

        let validForm = this.validateForm();

        NumVerify(this.state.phoneNumber, this.state.countryCode)
            .then((result) => {
                if (result.data.valid) {
                    this.setState({ validPhoneNumber: true });
                } else {
                    this.setState({ validPhoneNumber: false });
                    validForm = false;
                }
            }).catch((err) => {
                console.log(err);
                if (this.state.phoneNumber.length === 10 || this.state.phoneNumber.length === 11) {
                    this.setState({ validPhoneNumber: true });
                } else {
                    this.setState({ validPhoneNumber: false });
                    validForm = false;
                }
            }).finally(() => {
                if (validForm) {
                    Notify.confirm('Confirm your request', '', 'Request', 'Cancel')
                        .then((result) => {
                            if (!result.isConfirmed) {
                                return;
                            }

                            this.setState({ booking: true})

                            this.bookAppointment();
                
                            this.state.operationCountries.split(',').forEach(country => {
                                country = country.trim()
                
                                const setValue = new Set();
                
                                let currentValue = localStorage.getItem(country)
                                let value = this.state.companyName.trim();
                
                                if (!currentValue) {
                                    localStorage.setItem(country, value);
                                } else {
                                    currentValue += `, ${value}`;
                                    
                                    currentValue.split(',').map(x => {
                                        setValue.add(x.trim())
                                        return x;
                                    });
                                    
                                    value = '';
                                    setValue.forEach(x => {
                                        value += x + ','
                                    })
                
                                    value = value.slice(0, -1);
                
                                    localStorage.setItem(country, value);
                                }
                            });
                        })
                }
            })
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
                Notify.error('Ops...', 'Error while booking the appointment. Please try again later.')
                console.log(err);
            }).finally(() => {
                this.setState({ booking: false })
            });
    }
    
    // todo find a better way in react to check for form validation
    validateForm = () => {
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const emailValidation = new RegExp(re).test(this.state.email);
    
        let validForm = true;
    
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
            let validFirstName = true;
            for (let i = 0; i < this.state.firstName.length; i++) {
                const element = this.state.firstName[i];
                if (numbers.includes(element)) {
                    validFirstName = false;
                    validForm = false
                    break;
                }
            }
            this.setState({ validFirstName: validFirstName })
        } else {
            this.setState({ validFirstName: false })
            validForm = false
        }

        if (this.state.lastName.length > 1) {
            let validLastName = true;
            for (let i = 0; i < this.state.lastName.length; i++) {
                const element = this.state.lastName[i];
                if (numbers.includes(element)) {
                    validLastName = false;
                    validForm = false
                    break;
                }
            }
            this.setState({ validLastName: validLastName })
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

    popUpMessage = (message) => {
        Notify.info(message);
    }

    handleChange = (event) => {
        let name, value = '';
        if (event === null) {
            setTimeout(() => {
                this.setState({ [this.state.openedMenu]: '' }, () => {
                    if (this.state.operationCountries.trim() === '' || this.state.operationCountries === undefined) {
                        this.setState({ chooseCompany: false, companyName: '' })
                    } else {
                        this.setState({ chooseCompany: true })
                    }
                });
            }, 50);
            return;
        }

        if (this.state.openedMenu === 'operationCountries') {

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
                
                if (event.value)
                    value = event.value;
                else
                    value = ''
            }
        } else {
            name = event.target.name;
            value = event.target.value
        }

        this.setState({[name]: value}, () => {
            if (this.state.operationCountries.trim() === '' || this.state.operationCountries === undefined) {
                this.setState({ chooseCompany: false })
            } else {
                this.setState({ chooseCompany: true })
            }
        });
    }
    
    getCountryValues = (country) => {
        const values = localStorage.getItem(country);
        const options = [];
        if (values) {
            values.split(',').forEach(x => {
                options.push({ value: x, name: 'companyName', label: x })
            })
        }

        return options;
    }

    render() {
        
        const countryOptions = [
            { value: 'country1', name: 'operationCountries', label: 'Country1' },
            { value: 'country2', name: 'operationCountries', label: 'Country2' },
            { value: 'country3', name: 'operationCountries', label: 'Country3' }
        ]

        let tempOptions = [];
        const companyOptions = [];

        if (this.state.operationCountries !== '' && this.state.operationCountries !== undefined) {
            this.state.operationCountries.split(',').forEach(element => {
                element = element.trim();

                if (element === 'country1') {
                    tempOptions.push({ value: 'Company1', name: 'companyName', label: 'Company1' });
                    tempOptions.push({ value: 'Company2', name: 'companyName', label: 'Company2' });
                }

                if (element === 'country2') {
                    tempOptions.push({ value: 'Company3', name: 'companyName', label: 'Company3' });
                }

                const countryValues = this.getCountryValues(element);

                if (countryValues.length > 0) {
                    tempOptions.push(...countryValues);
                }


                for (let i = 0; i < tempOptions.length; i++) {
                    let addToList = true;
                    for (let j = 0; j < companyOptions.length; j++) {                        
                        if (tempOptions[i].value.toLowerCase() === companyOptions[j].value.toLowerCase()) {
                            addToList = false;
                        }
                    }

                    if (addToList)
                        companyOptions.push(tempOptions[i]);
                }
            });
        }

        const objectiveOptions = [
            { value: 'complaint', name: 'objective', label: 'Complaint' },
            { value: 'suggestion', name: 'objective', label: 'Suggestion' }
        ]

        const countryCodesOptions = CountryCodes.map((code, index) => {
            return (
                <option key={index} value={code.code}>
                    {`${code.code} ${code.dial_code}`} 
                </option>
            );
        });
        
        return (
            <AppointmentView
                requestAppointment={this.requestAppointment} 
                handleChange={this.handleChange}
                setOpenedMenu={this.setOpenedMenu}
                countryOptions={countryOptions}
                countryCodesOptions={countryCodesOptions}
                companyOptions={[...companyOptions]}
                objectiveOptions={objectiveOptions}
                state={this.state}
                booked={this.state.booked}
                popUpMessage={this.popUpMessage}
            />
        );
    }
}

export default Appointment;
