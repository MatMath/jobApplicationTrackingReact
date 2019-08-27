import React, { useState, useEffect } from "react";

import { Table } from 'react-bootstrap';
import './jobList.css';

import TableRow from './TableRow';
import ExtendedDisplay from './ExtendedDisplay';

export default function JobListContainer() {
  const [list, setList] = useState(MockAPI);
  const [activeId, setActiveId] = useState(1);
  const [orderBy, setOrderBy] = useState({name: '', direction: 1});
  const jobListCount = list.length;

  const renderDataRow = (item) => {
    if (item._id === activeId) return (<ExtendedDisplay key={item._id} value={item} onClick={() => showData(item._id)}></ExtendedDisplay>);
    return (<TableRow key={item._id} value={item} onClick={() => showData(item._id)}></TableRow>);
  }

  const showData = (id) => {
    if(!id) return;
    if(activeId === id) return setActiveId(0);
    return setActiveId(id);
  }

  const orderListBy = (data, name) => {
    console.log('OrderBy:', data, name)
    let order = 1;
    if (name === orderBy.name) {
      order = -orderBy.direction;
    }
    let tmp;
    switch (data) {
      case 'options':
        if (orderBy.name === 'options') return;
        // Set the answer received first.
        tmp = list.sort((a,b) => {
          if (a.answer_receive === b.answer_receive) return 0;
          if (a.answer_receive < b.answer_receive) return 1;
          return -1;
        });
        break;
      case 'date':
        tmp = list.sort((a,b) => {
          if (a.date === b.date) return 0;
          if (a.date < b.date) return 1*order;
          return -1 * order;
        });
        break;
      case 'key':
        // Set by super basic Alphanumeric sort.
        tmp = list.sort((a,b) => {
          if (!a[name]) { a[name] = ''};
          if (!b[name]) { b[name] = ''};
          return a[name].localeCompare(b[name]) *order;
        });
        break;
      default:
        break;
    }
    setList(tmp);
    return setOrderBy({'name': name, direction: order});
  }

  return (
    <div className="container main-data">
      <h1> List Length - {jobListCount}</h1>
      <div>Filter By:</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => orderListBy('options')}>Options</th>
            <th onClick={() => orderListBy('key', 'company')}>Cie</th>
            <th onClick={() => orderListBy('key', 'recruiters')}>Recruiters</th>
            <th onClick={() => orderListBy('key', 'title')}>Title</th>
            <th onClick={() => orderListBy('date')}>Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => renderDataRow(item))}
        </tbody>
      </Table>
    </div>
  )
}

const MockAPI = [
  {"_id":"59edcbe7dce229549525abea",
    "location":"Blood Stoney Rd, Grand Canal Dock, Dublin, Ireland",
    "website":"Indeed",
    "applicationType":"Direct",
    "company":"Equifax",
    "title":"Front End Eng",
    "description":"Mid-Level position",
    "date":"2017-10-23",
    "application":true,
    "answer_receive":true,
    "meeting":[{"date":"2017-10-27",
      "participants":[],
      "purpose":"First HR phone call",
      "notes":"I just talked, they are using Angular2 and some new tech. It seems to be the in the research department section. "},{"date":"2017-11-09",
      "participants":[],
      "purpose":"All the interview",
      "notes":"Director: Went good talked about the Cie, the role and what they do. \nHR: Lot of talking, he looked at the work visa. Still uncertain what ti will do for me :/ Super confusing Stamp system here. \nTechnical Interview: Not really technical, just talked randomly about all frameworks and stuff. and how we handled stuff. "}
    ],
    "notes":"No Cover letter, only a Linked-in, and a PDF\nNo technical test, but I got refuse... The interview went well, but I said the truth that I am not a Expect in CSS and Bam, Out. Telling the truth get me nowhere.\n\nThey are hirering 100 people in the next year and I did not make the cut, Something is wrong... (full comment in the blog post)",
    "cover_letter":"",
    "email":"mathieu.k.legault@gmail.com",
    "offer":"Rejected"},
  {"_id":"59f22e7c2997a98380b8cf54","location":"Dublin, Ireland","applicationType":"Recruiters","company":"Future finance","title":"Senior Front-end","date":"2017-09-17","application":false,"answer_receive":true,"meeting":[{"date":"2017-10-06","participants":["CTO"],"purpose":"Phone CTO","notes":"Talked with the CTO"},{"date":"2017-10-12","participants":["Tech lead"],"purpose":"In person Tech lead","notes":"I talked with the tech lead and it went good, nothing technical, just overview of all the different stuff I did do before. "},{"date":"2017-10-12","participants":["Fron-end guy","Backend Guy"],"purpose":"Whiteboard challenge","notes":"I did failed miserably. \nQuestion 1 was about class so that did not work since I never use classes. \nQ2 was about how to flatten an array, and surprisingly I don't know how to do that on a whiteboard it seems. "},{"date":"2017-10-23","participants":["NA"],"purpose":"Coding challenge","notes":"Design a front-end ??? Seriously??? Anyway...\nMake a list possible, Filter, blabla, detail view...\nIt is on Github at: https://github.com/MatMath/ng2_home_assignment\n"}],"notes":"They use Typescript, so it is good, but I am less and less into the Class structure of Angular2.  They seems to use Class flow instead of Functional flow.","email":"mathieu.k.legault@gmail.com","offer":"Rejected","recruiters":"Reach Perso","website":"Indeed"},
  {"_id":"59f9a9f14c97fc4dece31bdb","location":" Grand Canal Dock, Dublin 2, Ireland","website":"Email","applicationType":"Recruiters","company":"TwoTenHealth","title":"Senior UI","description":"https://docs.google.com/document/d/1mWmJ7wqVvb_WutJEXaccibqURJiXSOciGrlHHOqXcgc/edit","date":"2017-11-01","application":true,"answer_receive":true,"meeting":[{"date":"2017-11-10","participants":[],"purpose":"In person meeting","notes":"In person meeting to see ???\nAgain another proof that telling the truth about your skills is Bad and should be avoided at all cost. ","challenge":"Small coding challenge of: Find all pair of number, & a few questions about Ineritance & JS school questions"}],"notes":"As you will see they are planning to migrate from AngularJS to Angular 2 and are looking for an experienced front-end developer specifically who has worked in this sphere or have strong Angular2 exposure. ","email":"mathieu.k.legault@gmail.com","recruiters":"Software Placement","offer":"Rejected"},
  {"_id":"59f9ad904c97fc4dece31bde","location":"Dublin 8","website":"Indeed","applicationType":"Direct","company":"SoftwareDesign","title":"Software Developer","date":"2017-09-17","application":true,"answer_receive":false,"meeting":[],"email":"mathieu.k.legault@gmail.com"},
  {"_id":"59f9ae704c97fc4dece31be2","location":"Dublin 2","website":"Indeed","applicationType":"Direct","company":"HMH","title":"Software developer","date":"2017-09-17","application":true,"answer_receive":false,"meeting":[],"email":"mathieu.k.legault@gmail.com"},
  {"_id":"59f9af654c97fc4dece31be5","location":"NA","applicationType":"Recruiters","recruiters":"eFinancial","company":"NA","title":"Fullstack","date":"2017-09-17","application":true,"answer_receive":false,"meeting":[],"email":"mathieu.k.legault@gmail.com"},
  {"_id":"59f9b2734c97fc4dece31be7","location":"3, Grand Canal Plaza, Grand Canal Street Upper, Grand Canal Dock, Dublin 4, D04 EE70, Ireland","applicationType":"Recruiters","recruiters":"Gempool","company":"Accenture","title":"NodeJs Eng","date":"2017-09-20","application":true,"answer_receive":false,"meeting":[],"notes":"","email":"mathieu.k.legault@gmail.com"},
  {"_id":"59f9b4aa4c97fc4dece31bef","location":"53 Merrion Square S, Dublin 2, D02 PR63, Ireland","website":"Linkedin","applicationType":"Recruiters","recruiters":"Gempool","company":"Pond5","title":"Front End Eng","date":"2017-09-20","application":true,"answer_receive":false,"meeting":[],"email":"mathieu.k.legault@gmail.com"},
  {"_id":"59f9b61a4c97fc4dece31bf1","location":"Digital Exchange Building, Crane Street, Dublin, D08 HKR9, Ireland","website":"Linkedin","applicationType":"Recruiters","recruiters":"Software Placement","company":"WIA","title":"NodeJs Eng","date":"2017-10-05","application":true,"answer_receive":false,"meeting":[],"email":"mathieu.k.legault@gmail.com"},
  {"_id":"59f9b9134c97fc4dece31bf3","location":"Dublin, Ireland","applicationType":"Recruiters","recruiters":"Software Placement","company":"Stars Interactive","title":"Senior Fullstack","date":"2017-10-05","application":true,"answer_receive":true,"meeting":[{"date":"2017-11-14","participants":["Jonathan Hearn"],"purpose":"Phone first meeting","notes":"The phone interview will be with:\nJONATHAN HEARN (Windows Senior Mobile Application Developer)\nMobile team in Dublin\nThey are Doing JS Typescript at the moment. \n\n- 3 JS  / 3 Android / 2 IOS / 2 tester / 1 PM\n- Backend Rendering for Angular Redering???\n- Node to generate small payload.\n- A number of releases? -> A every few weeks.\n- Location? Cherrywood 1h away from Downtown.\n\nLook for Android: Casino app. Irish play store PokerStart -> Canadian app they want to change. \n\nAndroid: Casino -> HTML5 app Angular.\nSoon: Docker for Hosting services.\nLouse conversation for requirement for Verbal and spit it out the concept.\nNo Sprint but Standup. And responible for your own Stuff.\nproto.io ??? for prototype."}],"email":"mathieu.k.legault@gmail.com","website":"Indeed","description":"","notes":"Looking for someone Senior but with 4Y experience :/ \nNext step: API call to a coding challenge. "}
]