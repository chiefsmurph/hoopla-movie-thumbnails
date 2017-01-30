import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import App from '../components/App';
import { Router, Route, browserHistory } from 'react-router';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={browserHistory}>
                      <Route path="/" component={App} />
                    </Router>
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
