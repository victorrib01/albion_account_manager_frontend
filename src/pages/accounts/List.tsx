import React, { useEffect, useState } from 'react';
import MyHeader from '../../components/Header';
import Modal from '../../components/Modal';
import api from '../../services/api'
import { Table } from 'semantic-ui-react';

interface AccountInterface {
    id: number;
    email: string;
    password: string;
}

export default function List() {
    const [accounts, setAccounts] = useState<AccountInterface[]>([])
    const [showDelete, setShowDelete] = useState(-1)
    const [showEdit, setShowEdit] = useState(-1)

    async function loadAccount() {
        const response = await api.get('accounts');
        setAccounts(response.data);
        console.log(response.data)
    }
    
    useEffect(() => {
        loadAccount()
    }, [])

    async function handleDeleteBox(id: number) {
        try {
            await api.delete(`accounts/${id}`)

            setAccounts(accounts.filter(bb => bb.id !== id));
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
                            <Table.HeaderCell>Email:</Table.HeaderCell>
                            <Table.HeaderCell>Password:</Table.HeaderCell>
                            <Table.HeaderCell>Editar:</Table.HeaderCell>
                            <Table.HeaderCell>Deletar:</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {accounts.map(bb => {
                            return (
                                <Table.Row key={bb.id}>
                                    <Table.Cell>{bb.id}</Table.Cell>
                                    <Table.Cell>{bb.email}</Table.Cell>
                                    <Table.Cell>{bb.password}</Table.Cell>
                                    <Table.Cell>
                                        <button type="button" onClick={(e) => setShowEdit(bb.id)}>
                                            Editar
                                        </button>
                                        <Modal onClose={(e: any) => setShowEdit(-1)} active={showEdit} id={bb.id}>
                                            <h1>Editando o email: {bb.email}</h1>
                                            <form >
                                                <label>Nome:</label>
                                                <input value={bb.email} />
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
                                            <h1>Tem certeza que deseja deletar a caixa {bb.email}?</h1>

                                            <button onClick={() => handleDeleteBox(bb.id)}>Sim</button>
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
