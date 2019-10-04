import { serverURL } from './config.js';

const urlExtension = {
  param: `${serverURL}/param`,
  cie: `${serverURL}/cie`,
  jobList: `${serverURL}/list`,
  recruiters: `${serverURL}/recruiters`,
  analytic: `${serverURL}/analytic`,
}

// NOTE: To optimize here we could add the Store to avoid multiple API call of the same route over and over.
const getAPIData = (type, id) => {
  if (type === 'jobId') {
    if (!id) return Promise.resolve(undefined);
    return fetch(`${urlExtension.jobList}/${id}`)
      .then(response => response.json());
  }
  return fetch(urlExtension[type])
    .then(response => response.json());
}

// POST =  New item in the DB.
const postAPIData = (type, data) => {
  return fetch(urlExtension[type], {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(function(response) {
    return response.json();
  }).catch(err => {
    console.log('err', err);
  })
};

// PUT =  Update item already in the DB.
const updateAPIData = (type, data) => {
  return fetch(urlExtension[type], {
    method: 'put',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(function(response) {
    return response.json();
  }).catch(err => {
    console.log('err', err);
  })
};

// PUT =  Update item already in the DB.
const deleteAPIData = (type, id) => {
  // WARN USER
  return fetch(`${urlExtension[type]}/${id}`, {
    method: 'delete',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(function(response) {
    return response.json();
  }).catch(err => {
    console.log('err', err);
  })
};

export {
  getAPIData,
  postAPIData,
  updateAPIData,
  deleteAPIData,
}