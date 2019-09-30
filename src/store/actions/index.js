import { MODIFY_BASE_JOB_DATA, RESET_BASE_JOB_DATA, CIE_LIST } from './actionTypes'
import { getCieList } from './companyActions';

export const modBaseJob = payload => ({
  type: MODIFY_BASE_JOB_DATA,
  payload,
});

export const resetBaseJob = payload => ({
  type: RESET_BASE_JOB_DATA,
  payload,
});

// export const getCieList = getCieList;