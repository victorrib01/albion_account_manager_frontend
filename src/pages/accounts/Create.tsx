import React, { FormEvent, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';

import { Form, Button } from 'semantic-ui-react';

// interface AccountInterface {
//     id: number;
//     email: string;
//     password: string;
// }

export default function CreateAccount() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        try {
            event.preventDefault();

            const data = { email, password }

            await api.post('accounts', data);
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
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="password">Password:</label>
                            <input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} />
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
