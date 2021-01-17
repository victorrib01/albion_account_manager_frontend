import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';

import { Form, Button } from 'semantic-ui-react';

import { IslandInterface, ConstructionInterface } from '../../common/types'

export default function Create() {

    const [value, setValue] = useState(0);

    const [constructions, setConstructions] = useState<ConstructionInterface[]>([])
    const [construction, setConstruction] = useState('');

    const [islands, setIslands] = useState<IslandInterface[]>([])
    const [island, setIsland] = useState('')

    async function load() {
        const constructionResponse = await api.get('constructions');
        setConstructions(constructionResponse.data)

        const islandResponse = await api.get('islands');
        setIslands(islandResponse.data)
    }

    useEffect(() => {
        load()
    }, [])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (construction != null) {
            try {
                const data = {
                    value,
                    construction
                }
    
                await api.post('daily_costs', data);
    
                alert('Cadastro realizado com sucesso!')
            } catch (error) {
                alert('Erro ao cadastrar!')
            }
        }
        if (island != null) {
            try {
                const data = {
                    value,
                    island
                }
    
                await api.post('daily_costs', data);
    
                alert('Cadastro realizado com sucesso!')
            } catch (error) {
                alert('Erro ao cadastrar!')
            }
        }

        
    }

    return (
        <>
            <Header />
            <div className="create">
                <div className="fields">
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label htmlFor="value">Value:</label>
                            <input inputMode="decimal" id="value" value={value} onChange={e => setValue(parseInt(e.target.value))} />
                        </Form.Field>
                        <Form.Field>
                            <label>Construction:</label>
                            <select onChange={e => setConstruction(e.target.value)} >
                                <option>Select one construction</option>
                                {constructions.map(({ id, name, island }) => {
                                    return (
                                        <option value={id} key={id}>Construction {name} from {island.char.nickname}</option>
                                    )
                                })}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label>Island:</label>
                            <select onChange={e => setIsland(e.target.value)} >
                                <option>Select one island</option>
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
