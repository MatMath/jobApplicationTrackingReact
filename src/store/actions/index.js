import { MODIFY_BASE_JOB_DATA, RESET_BASE_JOB_DATA } from './actionTypes'

export const modBaseJob = payload => ({
  type: MODIFY_BASE_JOB_DATA,
  payload,
});

export const resetBaseJob = payload => ({
  type: RESET_BASE_JOB_DATA,
  payload,
});