import authentication from 'feathers-authentication';
import {
  populateEvents,
  validateMembership,
  validateOwnership,
  validatePayload,
  toSnakeCase,
  toCamelCase } from '../../../hooks';
import populateItem from './populateItem';
import validateInput from './validateInput';

const auth = authentication.hooks;

export const before = {
  all: [
    toSnakeCase(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateMembership(),
    populateItem()
  ],
  create: [
    validateInput()
  ],
  patch: [
    validateInput(),
    validatePayload('value')
  ]
};

export const after = {
  all: [
    toCamelCase()
  ]
};
