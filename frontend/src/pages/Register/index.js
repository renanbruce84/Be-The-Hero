import React, { useState } from 'react'; // Módulo raiz do React
import { Link, useHistory } from "react-router-dom"; // Realizar o route entra as pagins
import { FiArrowLeft } from "react-icons/fi"; // Icones de Feather Icons

import api from '../../services/api';
import './style.css';

import logoImg from "../../assets/img/logo.svg";


export default function Register() {

    // as variáveis que guardaão os datos temporariamente
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history =  useHistory();

    // Função que realiza as tratativas do registro para o Back-end
    async function handleRegister(event) {
        // Evita o reload da página ao apertar no botão
        event.preventDefault();

        // guarda os valores das variáveis dentro da variável data
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            // envia o data através de um POST para  http://localhost/ongs
            const response = await api.post('ongs', data);
            alert (`Seu ID de acesso: ${response.data.id}`); 
            
            // Redireciona para a a raiz
            history.push('/');

        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    }


    return (
        <div className="register-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="logotipo" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entra na plataforma e ajude pessoas a emcontrar os casos da sua ONG.</p>

                    {/* LINK  esta substituindo o (a href="") para evitar de recarregar toda a página e fucnionar como um SPA */}
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister} >

                    <input type="text"
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <input type="text"
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)}
                    />

                    {/* div - cidade - uf */}
                    <div className="input-group">
                        <input type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />

                        <input type="text"
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={event => setUf(event.target.value)}
                        />
                    </div>

                    <button className="button">Cadastrar</button>

                </form>

            </div>
        </div>
    )
}