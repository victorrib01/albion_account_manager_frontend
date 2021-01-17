import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';

import '../../styles/methods/create.css'

import { Form, Button } from 'semantic-ui-react';

import {CharInterface, LocationInterface, IslandTypeInterface} from '../../common/types'

export default function CreateIsland() {
    const [level, setLevel] = useState(0);
    const [active, setActive] = useState(false);
    const [type, setType] = useState('')
    const [location, setLocation] = useState('')
    const [char, setChar] = useState('');

    const [types, setTypes] = useState<IslandTypeInterface[]>([])
    const [locations, setLocations] = useState<LocationInterface[]>([])
    const [chars, setChars] = useState<CharInterface[]>([]);

    async function loadRelations() {
        const charsResponse = await api.get('chars');
        setChars(charsResponse.data)

        const typesResponse = await api.get('island_types');
        setTypes(typesResponse.data)

        const locationResponse = await api.get('locations');
        setLocations(locationResponse.data)
    }

    useEffect(() => {
        loadRelations()
    }, [])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const data = {
                level,
                active,
                type,
                location,
                char,
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
                            <label>Type:</label>
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
                            <label>Location:</label>
                            <select onChange={e => setLocation(e.target.value)} >
                                <option>Select one Location</option>
                                {locations.map(({ id, name }) => {
                                    return (
                                        <option value={id} key={id}>{name}</option>
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
