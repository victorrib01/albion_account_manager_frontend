import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';

import { Form, Button } from 'semantic-ui-react';

interface CharsInterface {
    id: number;
    nickname: string;
}

export default function CreateIsland() {
    const [level, setLevel] = useState(0);
    const [dailyEarnings, setDailyEarnings] = useState(0);
    const [active, setActive] = useState(false);
    const [char, setChar] = useState('');

    const [chars, setChars] = useState<CharsInterface[]>([]);

    async function loadChars() {
        const response = await api.get('chars');
        setChars(response.data)
    }

    useEffect(() => {
        loadChars()
    }, [])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const data = {
                level,
                dailyEarnings,
                char,
                active: active.toString()
            }

            await api.post('islands', data);
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
                            <label htmlFor="level">Level:</label>
                            <input inputMode="decimal" id="level" value={level} onChange={e => setLevel(parseInt(e.target.value))} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="dailyEarnings">Daily Earnings:</label>
                            <input inputMode="decimal" id="dailyEarnings" value={dailyEarnings} onChange={e => setDailyEarnings(parseInt(e.target.value))} />
                        </Form.Field>
                        <Form.Field>
                            <label>Char:</label>
                            <select onChange={e => setChar(e.target.value)} >
                                <option>Selecione um char</option>
                                {chars.map(({ id, nickname }) => {
                                    return (
                                        <option value={id} key={id}>{nickname}</option>
                                    )
                                })}
                            </select>
                        </Form.Field>
                        <Form.Field>
                        <label htmlFor="active">Ativo:</label>
                        <Button type="button" className={active ? 'active' : ''} onClick={() => setActive(true)} >Sim</Button>
                        <Button type="button" className={!active ? 'active' : ''} onClick={() => setActive(false)} >Não</Button>
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
