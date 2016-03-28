import authentication from 'feathers-authentication';
import validateOwner from './validateOwner';

const auth = authentication.hooks;

export const before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateOwner()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateOwner()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateOwner()
  ]
};

export const after = {
  all: []
};