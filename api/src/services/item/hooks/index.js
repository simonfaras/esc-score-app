import authentication from 'feathers-authentication';
import validateOwner from '../../event/hooks/validateOwner';

const validateOwnerOptions = {
  eventId: hook => hook.params.eventId
};

const auth = authentication.hooks;

export const before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    //validateOwner(validateOwnerOptions) // TODO Validate membership
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(), // TODO Validate membership
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateOwner(validateOwnerOptions)
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateOwner(validateOwnerOptions)
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateOwner(validateOwnerOptions)
  ]
};

export const after = {
  all: []
};