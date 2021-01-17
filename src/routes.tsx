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
import CreateConstructions from './pages/constructions/Create'
import ListConstructions from './pages/constructions/List'

// Daily Earnings routes
import CreateDailyEarnings from './pages/daily_earnings/Create'
import ListDailyEarnings from './pages/daily_earnings/List'

// Daily Costs routes
import CreateDailyCosts from './pages/daily_costs/Create'
import ListDailyCosts from './pages/daily_costs/List'

// Products routes
import CreateProducts from './pages/products/Create'
import ListProducts from './pages/products/List'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/accounts/create" component={CreateAccounts} />
                <Route path="/accounts/list" component={ListAccounts} />

                <Route path="/chars/create" component={CreateChars} />
                <Route path="/chars/list" component={ListChars} />

                <Route path="/islands/create" component={CreateIslands} />
                <Route path="/islands/list" component={ListCategories} />

                <Route path="/constructions/create" component={CreateConstructions} />
                <Route path="/constructions/list" component={ListConstructions} />
                
                <Route path="/daily_earnings/create" component={CreateDailyEarnings} />
                <Route path="/daily_earnings/list" component={ListDailyEarnings} />
                
                <Route path="/daily_costs/create" component={CreateDailyCosts} />
                <Route path="/daily_costs/list" component={ListDailyCosts} />
                
                <Route path="/products/create" component={CreateProducts} />
                <Route path="/products/list" component={ListProducts} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;