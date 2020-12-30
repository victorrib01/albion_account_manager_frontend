import React, { useEffect, useState } from 'react';
import MyHeader from '../../components/Header';
import Modal from '../../components/Modal';
import api from '../../services/api'
import { Table } from 'semantic-ui-react';

interface BuildingInterface {
    id: number;
    name: string;
    tier: number;
    daily_earnings: number;
    island: IslandInterface;
}

interface IslandInterface {
    id: number;
    level: number;
    char: {
        nickname: string
    }
    dailyEarnings: number;
    active: boolean;
}

export default function List() {
    const [buildings, setBuildings] = useState<BuildingInterface[]>([])
    const [showDelete, setShowDelete] = useState(-1)
    const [showEdit, setShowEdit] = useState(-1)

    async function loadBuildings() {
        const response = await api.get('buildings');
        setBuildings(response.data);
    }

    useEffect(() => {
        loadBuildings()
    }, [])

    async function handleDelete(id: number) {
        try {
            await api.delete(`buildings/${id}`)

            setBuildings(buildings.filter(bb => bb.id !== id));
            alert('Deletado com sucesso!')
        } catch (err) {
            alert('Erro ao deletar, tente novamente');
        }
    }


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
                            <Table.HeaderCell>Daily Earnings:</Table.HeaderCell>
                            <Table.HeaderCell>Char Island:</Table.HeaderCell>
                            <Table.HeaderCell>Editar:</Table.HeaderCell>
                            <Table.HeaderCell>Deletar:</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {buildings.map(bb => {
                            return (
                                <Table.Row key={bb.id}>
                                    <Table.Cell>{bb.id}</Table.Cell>
                                    <Table.Cell>{bb.name}</Table.Cell>
                                    <Table.Cell>{bb.tier}</Table.Cell>
                                    <Table.Cell>{bb.daily_earnings}</Table.Cell>
                                    <Table.Cell>{bb.island.char.nickname}</Table.Cell>
                                    <Table.Cell>
                                        <button type="button" onClick={(e) => setShowEdit(bb.id)}>
                                            Editar
                                        </button>
                                        <Modal onClose={(e: any) => setShowEdit(-1)} active={showEdit} id={bb.id}>
                                            <h1>Editando o email: {bb.name}</h1>
                                            <form >
                                                <label>Nome:</label>
                                                <input value={bb.name} />
                                                <label>Categoria:</label>
                                                <button type="submit">Confirmar</button>
                                                <button onClick={(e: any) => setShowEdit(-1)}>Cancelar</button>
                                            </form>
                                        </Modal>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button type="button" onClick={(e) => setShowDelete(bb.id)}>
                                            Deletar
                                        </button>
                                        <Modal onClose={(e: any) => setShowDelete(-1)} active={showDelete} id={bb.id}>
                                            <h1>Tem certeza que deseja deletar a caixa {bb.name}?</h1>

                                            <button onClick={() => handleDelete(bb.id)}>Sim</button>
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
