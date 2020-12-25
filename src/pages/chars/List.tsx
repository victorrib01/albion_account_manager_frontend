import React, { FormEvent, useEffect, useState } from 'react';
import MyHeader from '../../components/Header';
import Modal from '../../components/Modal';
import api from '../../services/api'
import { Table} from 'semantic-ui-react';

interface CharsInterface {
    id: number;
    nickname: string;
    silver: number;
    premium: boolean;
    firstPremium: boolean;
    account: {
        id: number;
        email: string;
    }
}

export default function List() {
    const [id, setId] = useState(0)
    const [chars, setChars] = useState<CharsInterface[]>([])
    const [showDelete, setShowDelete] = useState(-1)
    const [showEdit, setShowEdit] = useState(-1)

    async function loadChars() {
        const response = await api.get('chars');
        setChars(response.data)
    }

    async function handleDeleteBox(id: number) {
        try {
            await api.delete(`boxes/${id}`)

            setChars(chars.filter(chars => chars.id !== id));
            alert('Deletado com sucesso!')
        } catch (err) {
            alert('Erro ao deletar, tente novamente');
        }
    }

    async function handleEditBox(event: FormEvent) {
        try {
            event.preventDefault();

            console.log(id)

            // const data = new FormData();

            // data.append('name', name);
            // data.append('description', description);
            // data.append('price', String(price));
            // data.append('stock', String(stock));
            // data.append('category_id', category)
            // data.append('active', String(active))

            // await api.put(`boxes/${id}`, data)
            alert('Edição realizada com sucesso!')
        } catch (err) {
            alert('Erro ao editar a caixa, tente nomavente')
        }
    }

    useEffect(() => {
        loadChars()
    }, [])
    
    return (
        <>
            <MyHeader />
            <div className="list">
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID:</Table.HeaderCell>
                            <Table.HeaderCell>Nickname:</Table.HeaderCell>
                            <Table.HeaderCell>Silver:</Table.HeaderCell>
                            <Table.HeaderCell>Premium:</Table.HeaderCell>
                            <Table.HeaderCell>First Premium:</Table.HeaderCell>
                            <Table.HeaderCell>Account:</Table.HeaderCell>
                            <Table.HeaderCell>Editar:</Table.HeaderCell>
                            <Table.HeaderCell>Deletar:</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {chars.map(char => {
                            return (
                                <Table.Row key={char.id}>
                                    <Table.Cell>{char.id}</Table.Cell>
                                    <Table.Cell>{char.nickname}</Table.Cell>
                                    <Table.Cell>{char.silver}</Table.Cell>
                                    <Table.Cell>{char.premium === true ? 'Ativo' : 'Desativo'}</Table.Cell>
                                    <Table.Cell>{char.firstPremium === true ? 'Ativo' : 'Desativo'}</Table.Cell>
                                    <Table.Cell>{char.account.email}</Table.Cell>
                                    <Table.Cell>
                                        <button type="button" onClick={(e) => setShowEdit(char.id)}>
                                            Editar
                                        </button>
                                        <Modal onClose={(e: any) => setShowEdit(-1)} active={showEdit} id={char.id}>
                                            <h1>Editando {char.nickname.toUpperCase()}</h1>
                                            <form onSubmit={handleEditBox}>
                                                <fieldset>
                                                    <input type="hidden" value={char.id} onChange={e => setId(parseInt(e.target.value))}/>
                                                    <label>Nickname:</label>
                                                    <input value={char.nickname} />
                                                    <label>Silver: </label>
                                                    <textarea value={char.silver} />
                                                    <label>Premium:</label>
                                                    <input type="checkbox" checked={char.premium} />
                                                    <label>First Premium:</label>
                                                    <input type="checkbox" checked={char.firstPremium} />
                                                    <label>Account:</label>
                                                    {/* <select>
                                                        {categories.map(c => {
                                                            return (
                                                                <option value={c.id} key={c.id} >{c.name}</option>
                                                            )
                                                        })}
                                                    </select> */}
                                                </fieldset>
                                                <button type="submit">Confirmar</button>
                                                <button onClick={(e: any) => setShowEdit(-1)}>Cancelar</button>
                                            </form>
                                        </Modal>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button type="button" onClick={(e) => setShowDelete(char.id)}>
                                            Deletar
                                        </button>
                                        <Modal onClose={(e: any) => setShowDelete(-1)} active={showDelete} id={char.id}>
                                            <h1>Tem certeza que deseja deletar {char.nickname.toUpperCase()}?</h1>

                                            <button onClick={() => handleDeleteBox(char.id)}>Sim</button>
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
