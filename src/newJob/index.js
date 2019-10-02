// Third party libs
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Form, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'
import deepcopy from 'deepcopy';

// Local components
import CompanyRowOptions from '../cie/CompanyRowOptions';
import RecruitersRowOptions from '../recruiters/RecruitersRowOptions';
import { getAPIData, postAPIData, updateAPIData } from '../apiEndpoint';
import { Spinner, DisplayError } from '../utils';
import { baseEmptyCie, baseEmptyRecruiters } from '../utils/baseValue';
import MeetingListInfo from './MeetingListInfo';

// Redux Data
import { modBaseJob, resetBaseJob } from './actions';

import { baseMeetingInfo }  from './jsonData';

function NewJobContainer(props) {
  const {id} = props.match.params;
 
  // Async URL params handling
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(undefined);
  
  // Display handling
  const [cie, setCie] = useState([]); // Original company from the API if we need to extreact from it. 
  
  const [recruiters, setRecruiters] = useState([]);
  const [addNewRecruiters, setAddNewRecruiters] = useState(baseEmptyRecruiters);

  const [websiteList, setWebsiteList] = useState(['', 'Indeed', 'Linkedin', 'ZipRecruters', 'IrishJob.ie','Email', 'NA']); // Get from API
  const [typeOfPosition, setTypeOfPosition] = useState(['Front End Eng', 'NodeJs Eng', 'Senior Front-end', 'Senior Backend', 'Fullstack', 'Senior Fullstack']); // Get from API
  const [companyNameList, setCompanyNameList] = useState([]);
  const [addNewCie, setAddNewCie] = useState(baseEmptyCie);

  const localRef = {};
  
  useEffect(() => {
    Promise.all([getAPIData('cie'), getAPIData('param'), getAPIData('recruiters'), getAPIData('jobId', id)])
    .then(arr => {
      setCompanyNameList(arr[0].map((item) => (item.name)));
      setCie(arr[0]);
      setWebsiteList(arr[1].website);
      setTypeOfPosition(arr[1].title);
      setRecruiters(arr[2].map((item) => item.cie));
      if(arr[3]) { props.modBaseJob({...props.data, ...arr[3]}); }
      setFetching(false);
    })
    .catch((err) => {
      setFetching(false);
      setError('404 not found');
    })
  }, []);
  
  const changeKey = (event) => {
    const {name, value, type} = event.target;
    if (type === 'checkbox') return props.modBaseJob({...props.data, [name]:!props.data[name]});
    return props.modBaseJob({...props.data, [name]:value});
  }

  const trueFalseClick = (key, value = !props.data[key]) => {
    return props.modBaseJob({...props.data, [key]:value});
  }

  // TypeAhead helper
  const setCieTypeahead = (item) => {
    if (item.length > 0 && typeof item[0] === 'string') {
      setAddNewCie(deepcopy(baseEmptyCie));
      return props.modBaseJob({...props.data, company: item[0]});
    }
    // Add new company
    if (item.length > 0) {
      const name = item[0].company;
      setAddNewCie({...deepcopy(baseEmptyCie), name});
    }
  };

  const displayEditCie = () => {
    if (addNewCie.name) return (
      <div>
        <Button onClick={() => setAddNewCie(baseEmptyCie)}>Use existing company</Button>
        <CompanyRowOptions noaction={true} item={addNewCie} onChange={setAddNewCie}></CompanyRowOptions>
        <hr></hr>
      </div>
      );
  };

  const setRecruiterTypeahead = (item) => {
    if (item.length > 0 && typeof item[0] === 'string') {
      setAddNewRecruiters(deepcopy(baseEmptyRecruiters));
      return props.modBaseJob({...props.data, recruiters: item[0]});
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
      return props.modBaseJob({...props.data, [key]: item[0]});
    }

    // "Add new" option
    if (item.length > 0) {
      return props.modBaseJob({...props.data, [key]: item[0][key]});
    }
  };

  const removeParticipant = (index, name) => {
    let meetings = props.data.meeting;
    meetings[index].participants = meetings[index].participants.filter(item => (item !== name));
    return props.modBaseJob({...props.data, meetings: meetings});
  }

  const updateMeeting = (index, event) => {
    const {name, value} = event.target;
    const meeting = props.data.meeting[index];
    if (name === 'newname' && value) {
      meeting.newname = "";
      meeting.participants.push(value);
    } else {
      meeting[name] = value;
    }

    const meetings = props.data.meeting;
    meetings[index] = meeting;
    return props.modBaseJob({...props.data, meeting: meetings});
  };

  const addMeeting = () => {
    return props.modBaseJob({...props.data, meeting: [...props.data.meeting, {...baseMeetingInfo, participants: []}]});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiCall = [];
    let tmp = props.data;
    tmp.company = (addNewCie.name)? addNewCie.name: tmp.company;
    
    // Update or Add new Job.
    apiCall[0] = (props.data._id)? updateAPIData('jobList', props.data): postAPIData('jobList', props.data);
    
    // Save the NEW copmpany if it is a new one
    if (addNewCie.name && !addNewCie._id) { 
      addNewCie.gps.properties.name = addNewCie.name; // TODO: fix in the BE.
      apiCall[1] = postAPIData('cie', addNewCie);
    }
    
    // Save the Recruiters if it is a new one -> addNewRecruiters
    if (addNewRecruiters.cie && !addNewRecruiters._id) {
      apiCall[2] = postAPIData('recruiters', addNewRecruiters);
    }

    // Ref inside the promise chain is lost for some reason.
    localRef.company.getInstance().clear();
    localRef.recruiter.getInstance().clear();
    localRef.title.getInstance().clear();
    localRef.website.getInstance().clear();
    
    Promise.all(apiCall).then((result) => {
      props.resetBaseJob();
      setAddNewCie(baseEmptyCie);
      setAddNewRecruiters(baseEmptyRecruiters);
      props.history.push(`/job/`);
      // Reset all typeahead.
      
    }).catch(err => {
      // TODO: Toast an error!
      console.log('err is: ', err);
    })
    
  };

  if(fetching) return (<Spinner></Spinner>);
  if(error) return (<DisplayError error={error}></DisplayError>);
  
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
            ref={ref => localRef.company = ref}
            allowNew
            newSelectionPrefix="Add a new company: "
            
            defaultInputValue={props.data.company}
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
            ref={ref => localRef.recruiter = ref}
            allowNew
            newSelectionPrefix="Add a new recruiter: "
            
            defaultInputValue={props.data.recruiters}
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
            value={props.data.location}
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
            ref={ref => localRef.title = ref}
            allowNew
            newSelectionPrefix="Title of the position: "
            
            defaultInputValue={props.data.title}
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
            ref={ref => localRef.website = ref}
            allowNew
            newSelectionPrefix="Add new website: "
            
            defaultInputValue={props.data.website}
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
            value={props.data.description}
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
            value={props.data.date}
            name="date"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">Did you apply</Form.Label>
        <Col sm="10">
          <ButtonGroup aria-label="Apply Q">
            <Button variant={(props.data.application === true)? 'success' : 'outline-success'} onClick={() => trueFalseClick('application', true)}>Yes</Button>
            <Button variant={(props.data.application === false)? 'danger' : 'outline-danger'} onClick={() => trueFalseClick('application', false)}>Not yet</Button>
          </ButtonGroup>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">Received and answer</Form.Label>
        <Col sm="10">
          <ButtonGroup aria-label="got-answer">
            <Button variant={(props.data.answer_receive === true)? 'success' : 'outline-success'} onClick={() => trueFalseClick('answer_receive', true)}>Yes</Button>
            <Button variant={(props.data.answer_receive === false)? 'danger' : 'outline-danger'} onClick={() => trueFalseClick('answer_receive', false)}>Not yet</Button>
          </ButtonGroup>
        </Col>
      </Form.Group>

      {props.data.meeting.map((item, index) => (<MeetingListInfo 
          key={index}
          removeParticipant={(value) => removeParticipant(index, value)}
          updateMeeting={(event) => updateMeeting(index, event)}
          data={item}>
          </MeetingListInfo>))}

      <Button variant="outline-success" onClick={() => addMeeting()}>ADD Meeting</Button>

      <Form.Group as={Row}>
        <Form.Label column sm="2">Notes</Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            rows="4"
            value={props.data.notes}
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
            value={props.data.cover_letter}
            name="cover_letter"
            onChange={changeKey}
          />
        </Col>
      </Form.Group>

      <Button variant="outline-success" type="submit"> Save </Button>

    </Form>
  </div>
  )
}

const mapStateToProps = (props) => ({
  data: props.newJob,
});

export default connect(
  mapStateToProps,
  { 
    modBaseJob,
    resetBaseJob,
  }
)(NewJobContainer)
