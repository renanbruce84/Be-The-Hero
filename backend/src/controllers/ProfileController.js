const connection = require('../database/connection');

module.exports = {

    // Recuperando os dados de incidents da ong
    async index(request, response) {
        // Acessa o ID da ong que esta logada
        const ong_id = request.headers.autorizacao;

        // Buscando todos os incidents que a ong atual criou
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

            return response.json(incidents);
    }
}