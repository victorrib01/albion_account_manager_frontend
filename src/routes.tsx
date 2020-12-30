import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

// Islands Routes
import CreateIslands from './pages/islands/Create'
import ListCategories from './pages/islands/List'

// Chars Routes
import CreateChars from './pages/chars/Create'
import ListChars from './pages/chars/List'

// Accounts routes
import CreateAccounts from './pages/accounts/Create'
import ListAccounts from './pages/accounts/List'

// Buildings routes
import CreateBuildings from './pages/buildings/Create'
import ListBuildings from './pages/buildings/List'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/islands/create" component={CreateIslands} />
                <Route path="/islands/list" component={ListCategories} />

                <Route path="/chars/create" component={CreateChars} />
                <Route path="/chars/list" component={ListChars} />

                <Route path="/accounts/create" component={CreateAccounts} />
                <Route path="/accounts/list" component={ListAccounts} />

                <Route path="/buildings/create" component={CreateBuildings} />
                <Route path="/buildings/list" component={ListBuildings} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;