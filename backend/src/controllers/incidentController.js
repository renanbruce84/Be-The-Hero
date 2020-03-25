const connection = require('../database/connection');

module.exports = {


    // equivale ao SELECT no sql
    async index(request, response) {

        // Recupera da query da url o valor PAGE
        const { page = 1 } = request.query;

        // Mostra a quantidade de ocorrencias total
        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            // retorna todos os recultados da tabela incidents e apenas alguns itens do tabela ongs
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // Envia para o header a variavel X-Count-Total
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    // Equivalente ao INSERT
    async create(request, response) {

        const { title, description, value } = request.body;
        // Acessa o ID da ong que esta logada
        const ong_id = request.headers.autorizacao;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });



    },

    // Equivalente ao DELETE
    async delete(request, response) {
        // Recuperando o id da url enviada -> http://localhost:3333/incidents/id -> id é o id do incident
        const { id } = request.params;
        // Acessa o ID da ong que esta logada
        const ong_id = request.headers.autorizacao;

        // Guarda as informações do elemento do id recuperado pelo request.params acima
        const incident = await connection('incidents')   // abre a conexao da tabela incidents
            .where('id', id)    // id recuerado usado no WHERE
            .select('ong_id')   // SELECT verificar sua funcionalidade 
            .first();           // seelciona o primeiro elemento (o resultado é de apenas um elemento)

        // Verifica se o ID da requisição é o mesmo da id da ong, para evitar apagar registros de outras ongs se nao a dele mesmo
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ erro: 'Operação não autorizada.' });
        }

        // DELETA as informações do elemento da tabela
        await connection('incidents')
            .where('id', id)
            .delete();

        // retorna um http 204 para informa que não tem mais nada para exibir
        return response.status(204).send();
    }

}