import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react'

function Header() {
    const menu = [
        {
            id: 1,
            text: 'Accounts',
            route: 'accounts'
        },
        {
            id: 2,
            text: 'Chars',
            route: 'chars'
        },
        {
            id: 3,
            text: 'Islands',
            route: 'islands'
        }
    ]
    return (
        <div className="header">
            <Menu>
                <Menu.Item>
                    <Link to="/">
                        Dashboard
                    </Link>
                </Menu.Item>
                {menu.map((menuItem => {
                    return (
                        <Dropdown item text={menuItem.text} key={menuItem.id}>
                            <Dropdown.Menu>
                                <Dropdown.Item text={`${menuItem.text}`}>
                                    <Link to={`/${menuItem.route}/create`}>
                                        <h1>Criar</h1>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to={`/${menuItem.route}/list`}>
                                        <h1>Listar</h1>
                                    </Link>
                                </Dropdown.Item>
                                {/* <Dropdown.Item>
                                    <Link to={`/${menuItem.route}/update`}>
                                        <h1>Editar</h1>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to={`/${menuItem.route}/delete`}>
                                        <h1>Deletar</h1>
                                    </Link>
                                </Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                }))}
            </Menu>
        </div>
    );
}

export default Header;
