// Third party libs
import React, { useState, useEffect } from "react";
import { Form, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'
import moment from 'moment';

// Local components
import CompanyRowOptions from '../cie/CompanyRowOptions';
import RecruitersRowOptions from '../cie/RecruitersRowOptions';
import { getAPIData, postAPIData } from '../apiEndpoint';
import { Spinner, DisplayError } from '../utils';
import { baseEmptyCie, baseEmptyRecruiters } from '../utils/baseValue';

const baseData = {
  _id: undefined,
  location: undefined,
  website: undefined,
  applicationType: undefined,
  recruiters: undefined,
  company: undefined,
  title: undefined,
  description: undefined,
  date: moment().format('YYYY-MM-DD'), // The "input" need the specific STRING format of YYYY-MM-DD not the Date object. 
  application: false,
  answer_receive: false,
  meeting: [],
  notes: undefined,
  cover_letter: undefined,
  offer: undefined,
  acceptedOffer: undefined,
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
  const [cie, setCie] = useState([]); // Original company from the API if we need to extreact from it. 
  
  const [recruiters, setRecruiters] = useState([]);
  const [addNewRecruiters, setAddNewRecruiters] = useState(baseEmptyRecruiters);

  const [websiteList, setWebsiteList] = useState(['', 'Indeed', 'Linkedin', 'ZipRecruters', 'IrishJob.ie','Email', 'NA']); // Get from API
  const [typeOfPosition, setTypeOfPosition] = useState(['Front End Eng', 'NodeJs Eng', 'Senior Front-end', 'Senior Backend', 'Fullstack', 'Senior Fullstack']); // Get from API
  const [companyNameList, setCompanyNameList] = useState([]);
  const [addNewCie, setAddNewCie] = useState(baseEmptyCie);
  // const [meetingInfo, setMeetingInfo] = useState(baseMeetingInfo);
  
  useEffect(() => {
    Promise.all([getAPIData('cie'), getAPIData('param'), getAPIData('recruiters'), getAPIData('jobId', id)])
    .then(arr => {
      setCompanyNameList(arr[0].map((item) => (item.name)));
      setCie(arr[0]);
      setWebsiteList(arr[1].website);
      setTypeOfPosition(arr[1].title);
      setRecruiters(arr[2].map((item) => item.cie));
      if(arr[3]) { setData({...data, ...arr[3]}); }
      setFetching(false);
    })
    .catch((err) => {
      setFetching(false);
      setError('404 not found');
    })
  }, []);
  
  const changeKey = (event) => {
    const {name, value, type} = event.target;
    if (type === 'checkbox') return setData({...data, [name]:!data[name]});
    return setData({...data, [name]:value});
  }

  const trueFalseClick = (key, value = !data[key]) => {    
    return setData({...data, [key]:value});
  }

  // TypeAhead helper
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
        <Button onClick={() => setAddNewCie(baseEmptyCie)}>Use existing company</Button>
        <CompanyRowOptions noaction={true} item={addNewCie}></CompanyRowOptions>
        <hr></hr>
      </div>
      );
  };

  const setRecruiterTypeahead = (item) => {
    if (item.length > 0 && typeof item[0] === 'string') {
      setAddNewRecruiters(baseEmptyRecruiters);
      return setData({...data, recruiters: item[0]});
    }
    // Add new recruiters
    if (item.length > 0) {
      const name = item[0].recruiter;
      setAddNewRecruiters({...addNewRecruiters, name});
    }
  };

  const displayEditRecruiters = () => {
    if (addNewRecruiters.name) {
      return (
        <div>
          <Button onClick={() => setAddNewRecruiters(baseEmptyRecruiters)}>Use existing recruiters</Button>
          <RecruitersRowOptions noaction={true} item={addNewRecruiters}></RecruitersRowOptions>
          <hr></hr>
        </div>
      );
    }
  }

  const setKeyTypeahead = (item, key) => {
    if (item.length > 0 && typeof item[0] === 'string') {
      return setData({...data, [key]: item[0]});
    }
    // "Add new" option
    if (item.length > 0) {
      return setData({...data, [key]: item[0].title});
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Save the NEW copmpany if it is a new one
    // Save the Recruiters if it is a new one -> addNewRecruiters
    // Then save/Resave the new Job

    setAddNewRecruiters(baseEmptyRecruiters);
    setAddNewCie(baseEmptyCie)
    // TODO: Trigger a refresh Top level when done. ie: blank data
  };

  if(fetching) return (<Spinner></Spinner>);
  if(error) return (<DisplayError error={error}></DisplayError>);
  console.log('rendering Data:', data);
  
  return (
  <div className='container main-data'>
    <h1>New application</h1>
    {displayEditCie()}
    {displayEditRecruiters()}
    <Form onSubmit={handleSubmit}>
    {(addNewCie.name)? "": (<Form.Group as={Row}>
        <Form.Label column sm="2">Select Company</Form.Label>
        <Col sm="10">
          <Typeahead
            id="company"
            allowNew
            newSelectionPrefix="Add a new company: "
            
            defaultInputValue={data.company}
            labelKey="company"
            options={companyNameList}
            placeholder="Choose an existing company..."
            onChange={setCieTypeahead}
          />
        </Col>
      </Form.Group>)}

      {(addNewRecruiters.name)? "": (<Form.Group as={Row}>
        <Form.Label column sm="2">Select Recruiters</Form.Label>
        <Col sm="10">
          <Typeahead
            id="recruiter"
            allowNew
            newSelectionPrefix="Add a new recruiter: "
            
            defaultInputValue={data.recruiters}
            labelKey="recruiter"
            options={recruiters}
            placeholder="Choose recruiters..."
            onChange={setRecruiterTypeahead}
          />
        </Col>
      </Form.Group>)}
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">City</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            defaultValue={data.location}
            name="location"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">Title</Form.Label>
        <Col sm="10">
          <Typeahead
            id="title"
            allowNew
            newSelectionPrefix="Title of the position: "
            
            defaultInputValue={data.title}
            labelKey="title"
            options={typeOfPosition}
            placeholder="Enter a new Position..."
            onChange={(item) => setKeyTypeahead(item, 'title')}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">Found on Website:</Form.Label>
        <Col sm="10">
        <Typeahead
            id="website"
            allowNew
            newSelectionPrefix="Add new website: "
            
            defaultInputValue={data.website}
            labelKey="website"
            options={websiteList}
            placeholder="Found on what website:"
            onChange={(item) => setKeyTypeahead(item, 'website')}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">Description</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            defaultValue={data.description}
            name="description"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">Date</Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            type="date"
            required
            value={data.date}
            name="date"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">Did you apply</Form.Label>
        <Col sm="10">
          <ButtonGroup aria-label="Apply Q">
            <Button variant={(data.application === true)? 'success' : 'outline-success'} onClick={() => trueFalseClick('application', true)}>Yes</Button>
            <Button variant={(data.application === false)? 'danger' : 'outline-danger'} onClick={() => trueFalseClick('application', false)}>Not yet</Button>
          </ButtonGroup>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">Notes</Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            rows="4"
            defaultValue={data.notes}
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
            defaultValue={data.cover_letter}
            name="cover_letter"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>

    </Form>
  </div>
  )
}