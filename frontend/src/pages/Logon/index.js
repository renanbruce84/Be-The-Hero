import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from 'react-icons/fi'; // react-icons/fi -> feather icons

import './style.css';

import api from '../../services/api'
import logoImg from '../../assets/img/logo.svg';
import heroesImg from '../../assets/img/heroes.png';


export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault(); // Não permite que a pagina recarregue

        try {
            const response = await api.post('sessions', { id }); // Enviando para umna pagina do BACK-END 
            
            // Criando alguns items no localStorage
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (error) {
            alert ('Falha no login, tente novamente.')
        }
    }


    return (

        <div className="logon-container">

            <section className="form">

                {/* Logotipo Imagem */}
                <img src={logoImg} alt="logotipo" />

                {/* Formulário */}
                <form onSubmit={handleLogin}>

                    <h1>Faça seu logon</h1>

                    {/* input e button */}
                    <input type="text"
                        placeholder="Sua ID"
                        value={id}
                        onChange={event => setId(event.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    {/* LINK  esta substituindo o (a href="") para evitar de recarregar toda a página e fucnionar como um SPA */}
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>

                </form>
                {/* Fim Formulário */}

            </section>

            <img src={heroesImg} alt="heroes" />

        </div>
    )
}