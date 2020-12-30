import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';

import { Form, Button } from 'semantic-ui-react';

interface IslandsInterface {
    id: number;
    level: number;
    char: {
        nickname: string
    }
    dailyEarnings: number;
    active: boolean;
}

export default function CreateBuilding() {

    const [name, setName] = useState('');
    const [tier, setTier] = useState(0);
    const [dailyEarning, setDailyEarning] = useState(0);
    const [island, setIsland] = useState('');

    const [islands, setIslands] = useState<IslandsInterface[]>([]);

    async function loadIslands() {
        const response = await api.get('islands');
        setIslands(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        loadIslands()
    }, [])

    async function handleSubmit(event: FormEvent) {
        try {
            event.preventDefault();

            const data = { 
                name, 
                tier, 
                daily_earnings: dailyEarning, 
                island}

            await api.post('buildings', data);
            alert('Cadastro realizado com sucesso!')
        } catch (error) {
            alert('Erro ao realizar o cadastro')
        }
    }

    return (
        <>
            <Header />
            <div className="create">
                <div className="fields">
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="tier">Tier:</label>
                            <input type="text" id="tier" value={tier} onChange={e => setTier(parseInt(e.target.value))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="dailyEarning">Daily Earning:</label>
                            <input type="text" id="dailyEarning" value={dailyEarning} onChange={e => setDailyEarning(parseInt(e.target.value))} />
                        </Form.Field>

                        <Form.Field>
                            <label>Char Island:</label>
                            <select onChange={e => setIsland(e.target.value)} >
                                <option>Select one char island</option>
                                {islands.map(({ id, char }) => {
                                    return (
                                        <option value={id} key={id}>{char.nickname}</option>
                                    )
                                })}
                            </select>
                        </Form.Field>
                        <Button type="submit" className="positive">
                            Confirmar
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}
