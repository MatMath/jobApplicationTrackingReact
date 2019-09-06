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

const postAPIData = (type, data) => {
  console.log('POST data:', type, data);
}

export {
  getAPIData,
  postAPIData,
}