// Third party libs
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'

// Local components
import CompanyRowOptions from '../cie/CompanyRowOptions';
import { getCieList, getJobDataId, getParams, getRecruitersList } from '../apiEndpoint';
import { Spinner, DisplayError } from "../utils";

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
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(undefined);
  
  // Display handling
  const [data, setData] = useState(baseData);
  const [cie, setCie] = useState([]);
  
  const [recruiters, setRecruiters] = useState([]);
  const [websiteList, setWebsiteList] = useState(['', 'Indeed', 'Linkedin', 'ZipRecruters', 'IrishJob.ie','Email', 'NA']); // Get from API
  const [typeOfPosition, setTypeOfPosition] = useState(['Front End Eng', 'NodeJs Eng', 'Senior Front-end', 'Senior Backend', 'Fullstack', 'Senior Fullstack']); // Get from API
  const [companyNameList, setCompanyNameList] = useState([]);
  const [addNewCie, setAddNewCie] = useState(baseEmptyCie);
  // const [meetingInfo, setMeetingInfo] = useState(baseMeetingInfo);
  
  useEffect(() => {
    Promise.all([getCieList(), getParams(), getRecruitersList(), getJobDataId(id)])
    .then(arr => {
      setCompanyNameList(arr[0].map((item) => (item.name)));
      setCie(arr[0]);
      setWebsiteList(arr[1].website);
      setTypeOfPosition(arr[1].title);
      setRecruiters(arr[2]);
      if(arr[3]) { setData({...data, ...arr[3]}); }
      setFetching(false);
    })
    .catch((err) => {
      setFetching(false);
      setError('404 not found');
    })
  }, []);
  
  const changeKey = (event) => {
    const {name, value} = event.target;
    setData(data => ({...data, [name]:value}));
  }

  const setCieTypeahead = (item) => {
    if (item.length > 0 && typeof item[0] === 'string') {
      setAddNewCie(baseEmptyCie);
      return setData({...data, company: item[0]});
    }
    // Add new company
    if (item.length > 0) {
      const name = item[0].company;
      setAddNewCie({...baseEmptyCie, name});
    }
  };

  const displayEditCie = () => {
    if (addNewCie.name) return (
      <div>
        <Button onClick={() => setAddNewCie(baseEmptyCie)}>Use Existing company</Button>
        <CompanyRowOptions item={addNewCie}></CompanyRowOptions>
        <hr></hr>
      </div>
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Trigger a refresh Top level when done.
  };

  if(fetching) return (<Spinner></Spinner>);
  if(error) return (<DisplayError error={error}></DisplayError>);
  return (
  <div className='container main-data'>
    <h1>New application</h1>
    {displayEditCie()}
    <Form onSubmit={handleSubmit}>
    {(addNewCie.name)? "": (<Form.Group as={Row}>
          <Form.Label column sm="2">Select Company</Form.Label>
          <Col sm="10">
            <Typeahead
              id="company"
              allowNew
              newSelectionPrefix="Add a new company: "
              
              labelKey="company"
              options={companyNameList}
              placeholder="Choose an existing company..."
              onChange={setCieTypeahead}
            />
          </Col>
        </Form.Group>)}
      
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