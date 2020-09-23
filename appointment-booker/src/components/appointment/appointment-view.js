import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

import backArrow from '../../assets/back-arrow.png'
import infoIcon from '../../assets/info-icon-button.png'

import './appointment-style.css'

function Appointment(props) {
    const style = {
        width: window.innerWidth < 768 ? '90%' : '40%',
    }

    const state = props.state

    const unvalidStyle = '2px solid rgb(214, 68, 68)'

    return (
        <>
            <Link to="/" className='back-arrow ml-3' >
                <img src={backArrow} width='50px' alt='backArrow' />
            </Link>
            <Form onSubmit={props.requestAppointment} className='book-appointment-form' style={style}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control 
                            type="text" 
                            value={state.firstName} 
                            name="firstName" 
                            placeholder="First Name" 
                            onChange={props.handleChange}
                            style={{ borderBottom:state.validFirstName === false ? unvalidStyle : '' }}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control 
                            type="text" 
                            value={state.lastName} 
                            name="lastName" 
                            placeholder="Last Name" 
                            onChange={props.handleChange} 
                            style={{ borderBottom:state.validLastName === false ? unvalidStyle : '' }}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Control 
                        type="email" 
                        value={state.email} 
                        name="email" 
                        placeholder="Work Email Address" 
                        onChange={props.handleChange} 
                        style={{ borderBottom:state.validEmail === false ? unvalidStyle : '' }}
                        />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} xs="auto">
                        <Form.Control 
                            value={state.countryCode} 
                            as="select" 
                            className="mr-sm-2" 
                            name="countryCode" 
                            custom onChange={props.handleChange}
                            style={{ borderBottom:state.validCountryCode === false ? unvalidStyle : '' }}
                        >
                            { props.countryCodesOptions }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control 
                            type="number" 
                            value={state.phoneNumber} 
                            name="phoneNumber" 
                            placeholder="Phone Number" 
                            onChange={props.handleChange} 
                            style={{ borderBottom:state.validPhoneNumber === false ? unvalidStyle : '' }}
                        />
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} style={{ borderBottom: state.validOperationCountries === false ? unvalidStyle : '' }}>
                        <Select
                            onMenuOpen={() => props.setOpenedMenu('operationCountries')}
                            placeholder="Operation Countries" 
                            name="operationCountries" 
                            onChange={props.handleChange} 
                            options={props.countryOptions} 
                            isMulti
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={1} className="mt-1 mr-2">
                        <span>
                            <img src={infoIcon} width='50px' alt="infoIcont" />
                        </span>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} style={{ borderBottom:state.validCompanyName === false ? unvalidStyle : '' }}>
                        <CreatableSelect 
                            placeholder="Company Name" 
                            name="companyName"
                            onMenuOpen={() => props.setOpenedMenu('companyName')}
                            options={props.companyOptions}
                            onChange={props.handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={1} className="mt-1 mr-2">
                        <span>
                            <img src={infoIcon} width='50px' alt="infoIcont" />
                        </span>
                    </Form.Group>
                </Form.Row>


                <Form.Group style={{ borderBottom:state.validObjective === false ? unvalidStyle : '' }}>
                    <CreatableSelect
                        onMenuOpen={() => props.setOpenedMenu('objective')}
                        placeholder="Objective" 
                        name="objective" 
                        options={props.objectiveOptions}
                        onChange={props.handleChange}
                        isMulti
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control 
                        as="textarea" 
                        value={state.description} 
                        name="description" 
                        placeholder="More Details/Description" 
                        rows={3} 
                        onChange={props.handleChange} 
                        style={{ borderBottom:state.validDescription === false ? unvalidStyle : '' }}
                    />
                </Form.Group>

                <Form.Group>
                    <Button type="submit" className="btn btn-primary">Request An Appointment</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default Appointment;
