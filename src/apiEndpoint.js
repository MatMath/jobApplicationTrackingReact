const serverURL = 'http://localhost:3001';
const urlExtension = {
  param: `${serverURL}/json/param`,
  cie: `${serverURL}/json/cie`,
  jobList: `${serverURL}/json/list`,
  recruiters: `${serverURL}/json/recruiters`,
  analytic: `${serverURL}/json/analytic`,
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
  return fetch(urlExtension.cie, {
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
  console.log('PUT data:', type, data);
  return fetch(urlExtension.cie, {
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

export {
  getAPIData,
  postAPIData,
  updateAPIData,
}