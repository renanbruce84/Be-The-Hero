import axios from 'axios';

// configura com a URL da pagina que pretende conectar, aqui é a URL do BACK-END
const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api;