import { expect } from 'chai';
import auth from './auth';

describe('Auth service Unit Test', () => {
  it('Has needed public methods', () => {
    auth.IS_AUTH_USER = !auth.IS_AUTH_USER;

    expect(auth.allowAuthUser({}));
    expect(auth.barAuthUser({}));
    expect(auth.signIn({}));
    expect(auth.signUp({}));
    expect(auth.passResetReq({}));
    expect(auth.passReset({}));
    expect(auth.IS_AUTH_USER).to.equal(true);
  });
});
