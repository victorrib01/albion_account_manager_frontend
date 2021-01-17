import React, { useEffect, useState } from 'react';
import MyHeader from '../../components/Header';
import Modal from '../../components/Modal';
import api from '../../services/api'
import { Table } from 'semantic-ui-react';

import {IslandInterface} from '../../common/types'

export default function List() {
    const [islands, setIslands] = useState<IslandInterface[]>([])
    const [showDelete, setShowDelete] = useState(-1)
    //const [showEdit, setShowEdit] = useState(-1)

    async function loadCategories() {
        const response = await api.get('islands');
        setIslands(response.data)
        console.log(response.data)
    }

    async function handleDelete(id: number) {
        try {
            await api.delete(`islands/${id}`)

            setIslands(islands.filter(islands => islands.id !== id));
            alert('Island deletada com sucesso!')
        } catch (err) {
            alert('Erro ao deletar a island, tente novamente');
        }
    }

    // async function handleEditBox(event: FormEvent) {
    //     try {
    //         event.preventDefault();

    //         console.log(id)

    //         // const data = new FormData();

    //         // data.append('name', name);
    //         // data.append('description', description);
    //         // data.append('price', String(price));
    //         // data.append('stock', String(stock));
    //         // data.append('category_id', category)
    //         // data.append('active', String(active))

    //         // await api.put(`boxes/${id}`, data)
    //         alert('Edição realizada com sucesso!')
    //     } catch (err) {
    //         alert('Erro ao editar a caixa, tente nomavente')
    //     }
    // }

    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <>
            <MyHeader />
            <div className="list">
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID:</Table.HeaderCell>
                            <Table.HeaderCell>Level:</Table.HeaderCell>
                            <Table.HeaderCell>Char:</Table.HeaderCell>
                            <Table.HeaderCell>Type:</Table.HeaderCell>
                            <Table.HeaderCell>Location:</Table.HeaderCell>
                            <Table.HeaderCell>Ativo:</Table.HeaderCell>
                            {/* <Table.HeaderCell>Editar:</Table.HeaderCell> */}
                            <Table.HeaderCell>Deletar:</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {islands.map(c => {
                            return (
                                <Table.Row key={c.id}>
                                    <Table.Cell>{c.id}</Table.Cell>
                                    <Table.Cell>{c.level}</Table.Cell>
                                    <Table.Cell>{c.char.nickname}</Table.Cell>
                                    <Table.Cell>{c.type.name}</Table.Cell>
                                    <Table.Cell>{c.location.name}</Table.Cell>
                                    <Table.Cell>{c.active === true ? 'Ativo' : 'Desativo'}</Table.Cell>
                                    {/* <Table.Cell>
                                        <button type="button" onClick={(e) => setShowEdit(c.id)}>
                                            Editar
                                        </button>
                                        <Modal onClose={(e: any) => setShowEdit(-1)} active={showEdit} id={c.id}>
                                            <h1>Editando a caixa {c.name.toUpperCase()}</h1>
                                            <form >
                                                <input type="hidden" value={c.id} onChange={e => setId(parseInt(e.target.value))} />
                                                <label>Nome:</label>
                                                <input value={box.name} />
                                                <label>Ativo:</label>
                                                <input type="checkbox" checked={c.active} />
                                                <label>Categoria:</label>
                                                <button type="submit">Confirmar</button>
                                                <button onClick={(e: any) => setShowEdit(-1)}>Cancelar</button>
                                            </form>
                                        </Modal>
                                    </Table.Cell> */}
                                    <Table.Cell>
                                        <button type="button" onClick={(e) => setShowDelete(c.id)}>
                                            Deletar
                                        </button>
                                        <Modal onClose={(e: any) => setShowDelete(-1)} active={showDelete} id={c.id}>
                                            <h1>Tem certeza que deseja deletar {c.id}?</h1>
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
