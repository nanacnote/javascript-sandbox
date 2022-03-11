import './index.css';

import '@riotjs/hot-reload';

import { register, mount, install } from 'riot';
import { Route, Router } from '@riotjs/route';

import App from './index.riot';
import Page from '../page/index.riot';
import Modal from '../modal/index.riot';
import StoreObserver from '../store/observer.riot';

import auth from '../service/auth';
import c from '../util/const';

const api = { auth }

install((component) => {
  Object.assign(component, { api, c });
});

register('store-observer', StoreObserver);
register('router', Router);
register('route', Route);
register('app', App);
register('page', Page);
register('modal', Modal);

mount('#root', null, 'app');
