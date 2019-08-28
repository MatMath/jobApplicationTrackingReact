const getJobDataId = (id) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      "_id":"5a0db7b422d9d554d0339e07",
      "location":"Dublin 2",
      "website":"Email",
      "applicationType":"Recruiters",
      "recruiters":"Software Placement",
      "company":"Crème Global",
      "title":"Front End AngularJS",
      "description":"Stack is AngularJS and Angular next. They’re also working with nodeJS.",
      "date":"2017-11-16",
      "application":true,
      "answer_receive":true,
      "meeting":[
        {"date":"2017-11-20","participants":["Brian O’Mullane"],"purpose":"Informal phone meeting","challenge":"Normal questions","notes":"Next: Have a tech interview. Talk about a project you did, what was the challenge, What you would change, how good did you understand the project...\nAll front-end with Angular1 and python backend?\nSome node in the mix for backend sometime. \n"},
        {"date":"2017-11-23","participants":["Brian O'Mullane","2 tech guys"],"purpose":"Perso & Tech & Reflection on old project","notes":"Lot of talking, lot of joking. \nUsual of talking about history and Agile and all those stuff."},
        {"date":"2017-11-28","participants":["Brian O'Mullane"],"purpose":"Informal meeting","notes":"It will be a fairly informal session, we might give him a tour of our arch and how we do things, to make sure it all works for him. certainly < 1hr\nit was about the Architecture of the software. What they use, what is doing what:\nAngular1 core product that only load what the user need when he login.\n"}
      ],
      "notes":"Seems Awesome actually...\nSalary will be up to €60k\nSmallish Team: 3 Front, 3 Back, 3 Tester. \nPlan to add 2 maybe. \nWell, They use AngularJS with Grunt & Google graph for the render. Started the new project 2y ago so I am a bit surprise about AngualrJS vs React. ",
      "email":"mathieu.k.legault@gmail.com",
      "offer":"Yes",
      "acceptedOffer":true
    })
  }, 1000);
});

const getCieList = () => Promise.resolve(
  [
    {"_id":"59f89809cf1e5d0e33d78344","name":"Equifax","location":"Blood Stoney Rd, Grand Canal Dock, Dublin, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.34494249999999,-6.236052400000062]},"properties":{"name":"Equifax"}},"email":"mathieu.k.legault@gmail.com"},
    {"_id":"59f89820cf1e5d0e33d78345","name":"Future finance","location":"Dublin, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.3461064,-6.256503699999939]},"properties":{"name":"Future finance"}},"email":"mathieu.k.legault@gmail.com"},
    {"_id":"59f9a9f14c97fc4dece31bda","name":"TwoTenHealth","location":" Grand Canal Dock, Dublin 2, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[52.5230063,13.410008699999935]},"properties":{"name":"TwoTenHealth"}},"email":"mathieu.k.legault@gmail.com"},
    {"_id":"59f9ad904c97fc4dece31bdd","name":"SoftwareDesign","location":"Digital Court, Rainsford St, Ushers, Dublin 8, D08 R2YP, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.3421514,-6.282675799999993]},"properties":{"name":"SoftwareDesign"}},"email":"mathieu.k.legault@gmail.com"},
    {"_id":"59f9ae0e4c97fc4dece31bdf","name":"HMH","location":"Trinity Central, 152-160 Pearse St, Dublin 2, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.3433758,-6.247317399999929]},"properties":{"name":"HMH"}},"email":"mathieu.k.legault@gmail.com"},
    {"_id":"59f9af654c97fc4dece31be4","name":"NA","location":"NA","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{}},"email":"mathieu.k.legault@gmail.com"},
    {"_id":"59f9b2354c97fc4dece31be6","name":"Accenture","location":"3, Grand Canal Plaza, Grand Canal Street Upper, Grand Canal Dock, Dublin 4, D04 EE70, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.3394414,-6.238942599999973]},"properties":{"name":"Accenture"}},"email":"mathieu.k.legault@gmail.com"}
  ]
);

const getRecruitersList = () => Promise.resolve(
  [
    {"_id":"59ec4d8de735e45cb6ec2752","cie":"Reach Perso","name":"Kieran Hinphey","email":"mathieu.k.legault@gmail.com"},
    {"_id":"59ec4dc1e735e45cb6ec2753","cie":"Gempool","name":"Sarah McGrath","email":"mathieu.k.legault@gmail.com"},
    {"_id":"59f9aae34c97fc4dece31bdc","cie":"Software Placement","name":"Kenny Vaughan","email":"mathieu.k.legault@gmail.com","notes":"Good:\nSuper professional, Good english (no accent), Send most of the info by mail, and only call to confirm some stuff. \n\nStrange:\nLove to meet me in person. "},
    {"_id":"59f9aee84c97fc4dece31be3","cie":"eFinancial","name":"NA","email":"mathieu.k.legault@gmail.com"}
  ]
);

const getParams = () => Promise.resolve({
  "website":["Indeed","Email","Linkedin","ZipRecruters","StackOverflow","https://www.tenna.com/careers/","https://boards.greenhouse.io/dataminr/jobs/1593296","https://nytimes.wd5.myworkdayjobs.com/en-US/Tech/job/New-York-NY/Data-Engineer_REQ-004951","https://nytimes.wd5.myworkdayjobs.com/en-US/Tech/job/New-York-NY/Senior-Software-Engineer--Customer-Care-Tools_REQ-003930-2","https://nytimes.wd5.myworkdayjobs.com/en-US/Tech/job/New-York-NY/Software-Engineer--User-Messaging_REQ-003996","https://www.appnexus.com/careers/open-roles","https://www.indeed.com/viewjob?jk=cce887a7dc1f6daa&tk=1d63idejo0nol002&from=serp&vjs=3","https://careers.google.com/jobs/results/6255439933276160-staff-software-engineer/?company=Google&company=YouTube&degree=MASTERS&employment_type=FULL_TIME&hl=en_US&jlo=en_US&location=New%20York,%20NY,%20USA&q=Software%20engineering&skills=Javascript&sort_by=relevance","https://careers.google.com/jobs/results/4916343814160384-software-engineer/?company=Google&company=YouTube&degree=MASTERS&employment_type=FULL_TIME&hl=en_US&jlo=en_US&location=New%20York,%20NY,%20USA&q=Software%20engineering&skills=Javascript&sort_by=relevance","https://careers.google.com/jobs/results/6716726810181632-software-engineer-tools-and-infrastructure/?company=Google&company=YouTube&employment_type=FULL_TIME&hl=en_US&jlo=en_US&location=New%20York,%20NY,%20USA&q=Software%20engineering&skills=Javascript&sort_by=relevance","https://careers.google.com/jobs/results/6640027454603264-web-solutions-engineer-youtube-content-tools/?company=Google&company=YouTube&employment_type=FULL_TIME&hl=en_US&jlo=en_US&location=New%20York,%20NY,%20USA&q=Software%20engineering&skills=Javascript&sort_by=relevance","https://careers.google.com/jobs/results/5804205828931584-front-end-software-engineer/?company=Google&company=YouTube&employment_type=FULL_TIME&hl=en_US&jlo=en_US&location=New%20York,%20NY,%20USA&q=Software%20engineering&skills=Javascript&sort_by=relevance","career.google.com","https://business.nasdaq.com/discover/careers/where-we-work/Index.html","https://templuminc.com/raise-capital","https://angel.co/company/maestroqa/jobs/456986-software-engineer","https://www.spotifyjobs.com/search-jobs/#search=javascript&category=engineering-it&location=usa","https://uscareers-goldmansachs.icims.com/jobs/45304/marquee-engineering---front-end-developer/job?mode=submit_apply","https://www.nytimes.com/","https://www.vts.com/","https://spruce.co/","https://stackoverflow.com/jobs/companies/joor#about-items","https://stackoverflow.com/jobs/companies/symbiont#about-items","https://www.linkedin.com/company/catalystio/about/","https://www.ciena.ca/","www.cnn.com","https://www.dashlane.com/"],
  "title":["Front End Eng","Senior Front-end","Senior UI","Software Developer","Software developer","Fullstack","NodeJs Eng","Senior Fullstack","Senior Front End Eng","Front End Developer","Front End Angular","Front End Angular2 Eng ","Web App Dev","Web UI Developer","Senior Software Eng","Desinger","Javascript Dev","Front End AngularJS","Senior Full Stack Developer","Senior Software Engineer, Front End","Data Engineer","Senior Software Engineer, Customer Care Tools","Software Engineer, User Messaging","Senior Front End Software Engineer, AppNexus Programmable Platform (UI, React, Redux)  ","Senior Software Engineer, TV Marketplace","Software Engineer, Web Services Platform Team","Sr. Software Development Engineer","Staff Software Engineer","Software Engineer","Software Engineer, Tools and Infrastructure","Web Solutions Engineer, YouTube Content Tools","Front End Software Engineer","Senior Software Engineer","Web Engineer- Arcade Team","Front End - Marquee Engineering","Javascript Software Engineer"]
});

const getJobList = () => Promise.resolve([
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
]);

export {
  getCieList,
  getJobDataId,
  getParams,
  getRecruitersList,
  getJobList,
}