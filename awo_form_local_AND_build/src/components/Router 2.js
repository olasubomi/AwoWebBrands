import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
// import ThirdPart from './ThirdPart';

// import NotFound from './NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route component={App} />
        </Switch>
    </BrowserRouter>
);

export default Router;