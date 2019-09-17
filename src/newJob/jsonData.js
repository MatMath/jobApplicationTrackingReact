import moment from 'moment';

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

export {
  baseData,
  baseMeetingInfo,
}