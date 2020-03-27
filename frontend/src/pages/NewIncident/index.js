import React, { useState } from 'react'; // Módulo raiz do React
import { Link, useHistory } from "react-router-dom"; // Realizar o route entra as pagins
import { FiArrowLeft } from "react-icons/fi"; // Icones de Feather Icons

import './style.css';
import logoImg from "../../assets/img/logo.svg";

import api from '../../services/api';

export default function Register() {

    // VARIAVEIS

    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValor] = useState('');

    const ongId = localStorage.getItem('ongId');

    // FUNCAO NEW INCIDENT
    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title, 
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers:{
                    Autorizacao: ongId
                }
            });
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }



    return (
        <div className="new-incident-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="logotipo" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamentee para encontrar um herói para resolver isso.</p>

                    {/* LINK  esta substituindo o (a href="") para evitar de recarregar toda a página e fucnionar como um SPA */}
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>

                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text" />

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />

                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValor(e.target.value)}
                        type="text" />


                    <button className="button">Cadastrar</button>

                </form>

            </div>
        </div>
    )
}