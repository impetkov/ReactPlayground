import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import configureStore from './store/configureStore';
import * as courseActions from './actions/courseActions'; 
import * as authorActions from './actions/authorActions'; 

const store = configureStore();
store.dispatch(courseActions.loadCourses());
store.dispatch(authorActions.loadAuthors());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);