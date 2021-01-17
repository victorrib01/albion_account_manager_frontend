import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';

import { Form, Button } from 'semantic-ui-react';

import {BuildingTypeInterface,IslandInterface} from '../../common/types'

export default function Create() {

    const [name, setName] = useState('');
    const [tier, setTier] = useState(0);
    const [type, setType] = useState('');
    const [island, setIsland] = useState('')
    
    const [types, setTypes] = useState<BuildingTypeInterface[]>([]);

    const [islands, setIslands] = useState<IslandInterface[]>([])
    
    async function loadTypes() {
        const response = await api.get('building_types');
        setTypes(response.data)
    }
    async function loadIslands() {
        const response = await api.get('islands');
        setIslands(response.data)
    }
    
    useEffect(() => {
        loadTypes()
        loadIslands()
    }, [])
    
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const data = {
                name, 
                tier, 
                type,
                island
            }

            await api.post('constructions', data);

            alert('Cadastro realizado com sucesso!')
        } catch (error) {

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
                            <input  inputMode="decimal" id="tier" value={tier} onChange={e => setTier(parseInt(e.target.value))} />
                        </Form.Field>
                        <Form.Field>
                            <label>Building type:</label>
                            <select onChange={e => setType(e.target.value)} >
                                <option>Select one type</option>
                                {types.map(({ id, name }) => {
                                    return (
                                        <option value={id} key={id}>{name}</option>
                                    )
                                })}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label>Char Island:</label>
                            <select onChange={e => setType(e.target.value)} >
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
