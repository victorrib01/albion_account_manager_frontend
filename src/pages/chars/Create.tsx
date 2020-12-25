import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';

import { Form, Button } from 'semantic-ui-react';

interface AccountsInterface {
    id: number;
    email: string;
    password: string;
}

export default function Create() {

    const [nickname, setNickname] = useState('');
    const [account, setAccount] = useState('');
    const [silver, setSilver] = useState(0);
    const [premium, setPremium] = useState(false);
    const [firstPremium, setFirstPremium] = useState(false);

    const [accounts, setAccounts] = useState<AccountsInterface[]>([])

    async function loadAccounts() {
        const response = await api.get('accounts');
        setAccounts(response.data)
    }

    useEffect(() => {
        loadAccounts()
    }, [])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const data = {
                nickname, 
                silver, 
                premium,
                firstPremium,
                account_id: account,
            }

            await api.post('chars', data);

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
                            <label htmlFor="nickname">Nickname:</label>
                            <input type="text" id="nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="silver">Silver:</label>
                            <input  inputMode="decimal" id="silver" value={silver} onChange={e => setSilver(parseInt(e.target.value))} />
                        </Form.Field>
                        <Form.Field>
                            <label>Account:</label>
                            <select onChange={e => setAccount(e.target.value)} >
                                <option>Selecione uma account</option>
                                {accounts.map(({ id, email }) => {
                                    return (
                                        <option value={id} key={id}>{email}</option>
                                    )
                                })}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="active">Premium:</label>
                            <Button type="button" className={premium ? 'active' : ''} onClick={() => setPremium(true)} >Sim</Button>
                            <Button type="button" className={!premium ? 'active' : ''} onClick={() => setPremium(false)} >Não</Button>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="active">First Premium:</label>
                            <Button type="button" className={firstPremium ? 'active' : ''} onClick={() => setFirstPremium(true)} >Sim</Button>
                            <Button type="button" className={!firstPremium ? 'active' : ''} onClick={() => setFirstPremium(false)} >Não</Button>
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
