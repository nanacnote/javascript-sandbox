import { router } from '@riotjs/route';
import Cookies from 'js-cookie';
import axios from 'axios';
import c from '../util/const';

class Auth {
  IS_AUTH_USER;

  constructor() {
    this.IS_AUTH_USER = !!Cookies.get(c.cookie.AUTH_TOKEN);
    this.inst = axios.create({
      baseURL: 'http://localhost:5000/auth',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  signIn(payload) {
    return this.inst
      .post('/sign-in', payload)
      .then(({ data }) => {
        this.IS_AUTH_USER = true;
        Cookies.set(c.cookie.AUTH_TOKEN, data.access_token);
        router.push(c.path.PROJECT_PAGE);
      })
      .catch((err) => console.error(err));
  }

  signUp(payload) {
    return this.inst
      .post('/sign-up', payload)
      .then(({ data }) => {
        this.IS_AUTH_USER = true;
        Cookies.set(c.cookie.AUTH_TOKEN, data.access_token);
        router.push(c.path.PROJECT_PAGE);
      })
      .catch((err) => console.error(err));
  }

  passResetReq(payload) {
    return this.inst
      .post('/password-reset-request', payload)
      .then((res) => console.info(res))
      .catch((err) => console.error(err));
  }

  passReset(payload) {
    return this.inst
      .put(
        '/password-reset',
        Object.assign(payload, {
          access_token: new URL(window.location.href).searchParams.get(
            'access_token'
          ),
        })
      )
      .then(({ data }) => {
        this.IS_AUTH_USER = true;
        Cookies.set(c.cookie.AUTH_TOKEN, data.access_token);
        router.push(c.path.PROJECT_PAGE);
      })
      .catch((err) => console.error(err));
  }
}

export default new Auth();
