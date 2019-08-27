import React, { useState, useEffect, useLayoutEffect } from "react";

import { Form, Button, Row, Col } from 'react-bootstrap';
import { getCieList, getJobDataId, getParams, getRecruitersList } from '../apiEndpoint';

const baseData = {
  _id: undefined,
  location: undefined,
  website: undefined,
  applicationType: undefined,
  recruiters: undefined,
  company: undefined,
  title: undefined,
  description: undefined,
  date: new Date(),
  application: false,
  answer_receive: false,
  meeting: [],
  notes: undefined,
  cover_letter: undefined,
  offer: undefined,
  acceptedOffer: undefined,
};

const baseEmptyCie = { 
  _id: undefined,
  name: undefined,
  location: undefined,
  gps: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      name: undefined,
    }
  },
  contact: undefined,
  link: undefined,
};

const baseMeetingInfo = {
  date: undefined,
  participants: [],
  purpose: undefined,
  challenge: undefined,
  notes: undefined,
};

export default function NewJobContainer(props) {
  const {id} = props.match.params;
 
  // Async URL params handling
  const [fetching, setFetching] = useState((id)? true: false); // Set default value depending id a ID got passed.
  const [error, setError] = useState(undefined);

  const [cie, setCie] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [websiteList, setWebsiteList] = useState(['', 'Indeed', 'Linkedin', 'ZipRecruters', 'IrishJob.ie','Email', 'NA']); // Get from API
  const [typeOfPosition, setTypeOfPosition] = useState(['Front End Eng', 'NodeJs Eng', 'Senior Front-end', 'Senior Backend', 'Fullstack', 'Senior Fullstack']); // Get from API
  // const [companyNameList, setCompanyNameList] = useState([]);
  const [data, setData] = useState(baseData);
  // const [emptyCie, setEmptyCie] = useState(baseEmptyCie);
  // const [meetingInfo, setMeetingInfo] = useState(baseMeetingInfo);
  
  useEffect(() => {
    if(fetching) {
      Promise.all([getCieList(), getJobDataId(), getParams(), getRecruitersList()])
      .then(arr => {
        console.log('Setting a bunch of stuff UseEffect AFTER Async render (once)');
        setCie(arr[0]);
        setData({...data, ...arr[1]});
        setWebsiteList(arr[2].website);
        setTypeOfPosition(arr[2].title);
        setRecruiters(arr[3]); // TODO: Wrap inside a promise.all(data,cie,recruiters)
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
        setError('404 not found');
      })
    }
  }, []);
  
  const changeKey = (event) => {
    const {name, value} = event.target;
    setData(data => ({...data, [name]:value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Trigger a refresh Top level when done.
  }

  if(fetching) return (<div>...Fetching</div>);
  // TODO: if fail to fetch from API add error handling.
  if(error) return (<div>ERROR X while Fetching data</div>);
  return (
  <div className='container main-data'>
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Form.Label column sm="2">Select Company</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={data.company}
            name='company'
            onChange={changeKey}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">City</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={data.location}
            name="location"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">Title</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={data.title}
            name="title"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">Select Website</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={data.website}
            name="website"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">Description</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={data.description}
            name="description"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>
      
      TODO: DATE PICKER HERE
      {/* Date Picker: {data.date} */}

      <Form.Group as={Row}>
        <Form.Label column sm="2">Did you apply</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={data.application}
            name="application"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">Notes</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={data.notes}
            name="notes"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">Cover letter URl</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={data.cover_letter}
            name="cover_letter"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>

    </Form>
  </div>
  )
}