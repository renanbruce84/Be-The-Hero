import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import './style.css';

import api from '../../services/api';
import logoImg from "../../assets/img/logo.svg";


export default function Profile() {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]); // inicia como array vazio

    // Recupera o item ongName de localStorage
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    useEffect(
        () => {
            api.get('profile', {
                headers: {
                    Autorizacao: ongId
                }
            }).then(response => {
                setIncidents(response.data);
            })
        },
        [ongId]
    );

    async function handleDeleteIncident(id) {
        try {
            await api.delete(
                `incidents/${id}`,
                {
                    headers: {
                        Autorizacao: ongId
                    }
                });
            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (error) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleLogout() {
        // Apaga todos os dados associados ao localStorage
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            {/* Header */}
            <header>
                <img src={logoImg} alt="logotipo" />
                <span>Bem vinda, {ongName}</span>

                {/* Link é a tag "a" do html*/}
                <Link className="button" to="/incidents/new" placeholder="">Cadastrar novo caso</Link>

                {/* Botão de Logout */}
                <button
                    onClick={handleLogout}
                    type="button">
                    {/* O icone de Power */}
                    <FiPower size={18} color="#e02041" />
                </button>
                
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incidents => ( // MAP -> retorna os valores dos elementos

                    <li key={incidents.id}> {/* KEY -> ajuda o React a encontrar o elemento que foi gerado pelo MAP ou FOREACH */}
                        <strong>CASO: </strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR: </strong>
                        {/* Intl -> função que formata valores de datas e numeros */}
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

                        <button
                            onClick={() => handleDeleteIncident(incidents.id)}
                            type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>

                ))}
            </ul>

        </div>
    )
}