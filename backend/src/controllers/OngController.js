const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {

    // equivale ao SELECT no sql
    async index(request, response) {
        const ongs = await connection('ongs')
            .select('*');
        return response.json(ongs);
    },


    // equivale ao INSERT no sql
    async create(resquest, response) {

        const { name, email, whatsapp, city, uf } = resquest.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        response.json({ id });
    }
}