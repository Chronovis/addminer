import * as React from 'react';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router } from 'react-router';
import App from '../components/app';
import Home from '../components/home/index';
import Login from '../components/login';
import Upload from '../components/upload';
import store from '../store';
import history from './history';

export default (
	<Provider store={store}>
		<Router history={history}>
			<Route
				component={App}
				onEnter={(nextState, replace, cb) => {
					const state = store.getState();
					if (!state.user.authenticated) {
						replace('/login');
					}
					cb();
				}}
				path="/"
			>
				<IndexRoute component={Home} />
				<Route
					component={Upload}
					path="upload"
				/>
			</Route>
			<Route
				component={Login}
				path="/login"
			/>
		</Router>
	</Provider>
);
