import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

// Categories Routes
import CreateIslands from './pages/islands/Create'
import ListCategories from './pages/islands/List'

// Boxes Routes
import CreateChars from './pages/chars/Create'
import ListChars from './pages/chars/List'

// Box Buttons routes
import CreateAccounts from './pages/accounts/Create'
import ListAccounts from './pages/accounts/List'

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

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;