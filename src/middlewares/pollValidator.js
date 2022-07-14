import pollSchema from "../schemas/pollSchema.js";

export function pollValidator (request, response, next){

    const poll = request.body;
    const validation = pollSchema.validate(poll);
    
    if(validation.error){
        return response.status(422).send('Título é obrigatório!!!')
    }

    next();
}