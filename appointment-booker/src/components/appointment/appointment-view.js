import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

import CountryCodes from './country-codes'
import backArrow from '../../assets/back-arrow.png'
import infoIcon from '../../assets/info-icon-button.png'

import './appointment-style.css'

function Appointment(props) {
    const style = {
        width: window.innerWidth < 768 ? '90%' : '40%',
    }

    const options = [
        { value: 'country1', label: 'Country1' },
        { value: 'country2', label: 'Country2' },
        { value: 'country3', label: 'Country3' }
    ]

    const objectiveOptions = [
        { value: 'complaint', label: 'Complaint' },
        { value: 'suggestion', label: 'Suggestion' }
    ]

    const countryCodesOptions = CountryCodes.map(code => {
        return (
            <option key={code} value={code.dial_code}>
                {`${code.code} ${code.dial_code}`} 
            </option>
        );
    });

    return (
        <>
            <Link to="/" className='back-arrow ml-3' >
                <img src={backArrow} width='50px' alt='backArrow' />
            </Link>
            <Form onSubmit={props.requestAppointment} className='book-appointment-form' style={style}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control type="text" name="firstName" placeholder="First Name" onChange={props.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control type="text" name="lastName" placeholder="Last Name" onChange={props.handleChange} />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Control type="email" name="email" placeholder="Work Email Address" onChange={props.handleChange} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} xs="auto">
                        <Form.Control as="select" className="mr-sm-2" name="countryCode" custom onChange={props.handleChange}>
                            { countryCodesOptions }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control type="number" name="phoneNumber" placeholder="Phone Number" onChange={props.handleChange} />
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col}>
                        <Select placeholder="Operation Countries" name="operationCountires" options={options} isMulti />
                    </Form.Group>
                    <Form.Group as={Col} xs={1} className="mt-1 mr-2">
                        <span>
                            <img src={infoIcon} width='50px' alt="infoIcont" />
                        </span>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <CreatableSelect 
                            placeholder="Company Name" 
                            name="companyName" 
                            options={options}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={1} className="mt-1 mr-2">
                        <span>
                            <img src={infoIcon} width='50px' alt="infoIcont" />
                        </span>
                    </Form.Group>
                </Form.Row>


                <Form.Group>
                    <CreatableSelect 
                        placeholder="Objective" 
                        name="companyName" 
                        options={objectiveOptions}
                        isMulti
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control as="textarea" name="description" placeholder="More Details/Description" rows={3} onChange={props.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Button type="submit" className="btn btn-primary">Request An Appointment</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default Appointment;
