import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api'
import { Link } from 'react-router-dom';

import '../styles/home.css'

import { Button, Card } from 'semantic-ui-react'


function Home() {
    const [accounts, setAccounts] = useState([])
    const [chars, setChars] = useState([])
    const [islands, setIslands] = useState([])
    const [constructions, setConstructions] = useState([])

    async function loadCounters() {
        const accountsResponse = await api.get('accounts');
        setAccounts(accountsResponse.data)

        const charsResponse = await api.get('chars');
        setChars(charsResponse.data)

        const islandsResponse = await api.get('islands');
        setIslands(islandsResponse.data)

        const constructionsResponse = await api.get('constructions');
        setConstructions(constructionsResponse.data)

        // const lastEarnResponse = await api.get('daily_earnings/lastearn');
        // const [{value}] = lastEarnResponse.data
        // setLastEarn(value);
    }

    useEffect(() => {
        loadCounters()
    }, [])

    return (
        <>
            <Header />
            <div className="home">
                <h1>Albion Manager Dashboard</h1>
                <div className="content">
                    <Card.Group className="counters">
                        <Card>
                            <Card.Content>
                                <Card.Header>Accounts</Card.Header>
                                <Card.Description>{accounts.length}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        <Link to='accounts/create'>Add</Link>
                                    </Button>
                                    <Button basic color='grey'>
                                        <Link to='accounts/list'>List</Link>
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>Chars</Card.Header>
                                <Card.Description>{chars.length}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        <Link to='chars/create'>Add</Link>
                                    </Button>
                                    <Button basic color='grey'>
                                        <Link to='chars/list'>List</Link>
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>Islands</Card.Header>
                                <Card.Description>{islands.length}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        <Link to='islands/create'>Add</Link>
                                    </Button>
                                    <Button basic color='grey'>
                                        <Link to='islands/list'>List</Link>
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>Constructions</Card.Header>
                                <Card.Description>{constructions.length}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        <Link to='constructions/create'>Add</Link>
                                    </Button>
                                    <Button basic color='grey'>
                                        <Link to='constructions/list'>List</Link>
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>Daily Earnings</Card.Header>
                                <Card.Description>Work in progress..</Card.Description>
                            </Card.Content>
                            {/* <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        <Link to='constructions/create'>Add</Link>
                                    </Button>
                                    <Button basic color='grey'>
                                        <Link to='constructions/list'>List</Link>
                                    </Button>
                                </div>
                            </Card.Content> */}
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>Daily Costs</Card.Header>
                                <Card.Description>Work in progress...</Card.Description>
                            </Card.Content>
                            {/* <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        <Link to='constructions/create'></Link>
                                    </Button>
                                    <Button basic color='grey'>
                                        <Link to='constructions/list'>List</Link>
                                    </Button>
                                </div>
                            </Card.Content> */}
                        </Card>
                    </Card.Group>
                </div>
            </div>
        </>
    );
}

export default Home;
