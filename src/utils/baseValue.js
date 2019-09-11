const baseEmptyCie = {
  name :"",
  location :"",
  gps: {
      "type":"Feature",
      "geometry":{
        "type":"Point",
        "coordinates":[0, 0]},
        "properties":{"name":""}
    }
}

const baseEmptyRecruiters = {
  _id:undefined,
  cie:'',
  name:'',
  email:'',
};


export {
  baseEmptyCie,
  baseEmptyRecruiters,
}

