import React, { useEffect, useState } from 'react';
import MyHeader from '../../components/Header';
import Modal from '../../components/Modal';
import api from '../../services/api'
import { Table} from 'semantic-ui-react';

import {ConstructionInterface} from '../../common/types'

export default function List() {
    const [constructions, setConstructions] = useState<ConstructionInterface[]>([])
    const [showDelete, setShowDelete] = useState(-1)

    async function loadConstructions() {
        const response = await api.get('constructions');
        setConstructions(response.data)
        console.log(response.data)
    }

    async function handleDelete(id: number) {
        try {
            await api.delete(`constructions/${id}`)

            setConstructions(constructions.filter(c => c.id !== id));
            alert('Deletado com sucesso!')
        } catch (err) {
            alert('Erro ao deletar, tente novamente');
        }
    }

    useEffect(() => {
        loadConstructions()
    }, [])
    
    return (
        <>
            <MyHeader />
            <div className="list">
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID:</Table.HeaderCell>
                            <Table.HeaderCell>Name:</Table.HeaderCell>
                            <Table.HeaderCell>Tier:</Table.HeaderCell>
                            <Table.HeaderCell>Type:</Table.HeaderCell>
                            <Table.HeaderCell>Char Island:</Table.HeaderCell>
                            <Table.HeaderCell>Deletar:</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {constructions.map(c => {
                            return (
                                <Table.Row key={c.id}>
                                    <Table.Cell>{c.id}</Table.Cell>
                                    <Table.Cell>{c.name}</Table.Cell>
                                    <Table.Cell>{c.tier}</Table.Cell>
                                    <Table.Cell>{c.type}</Table.Cell>

                                    <Table.Cell>
                                        <button type="button" onClick={(e) => setShowDelete(c.id)}>
                                            Deletar
                                        </button>
                                        <Modal onClose={(e: any) => setShowDelete(-1)} active={showDelete} id={c.id}>
                                            <h1>Tem certeza que deseja deletar {c.name.toUpperCase()} da ilha {c.island.char.nickname}?</h1>

                                            <button onClick={() => handleDelete(c.id)}>Sim</button>
                                            <button>Não</button>
                                        </Modal>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>


        </>
    );
}
