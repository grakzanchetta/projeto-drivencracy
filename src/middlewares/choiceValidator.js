import choiceSchema from "../schemas/choiceSchema.js";

export function choiceValidate (request, response, next){

    const choicePosted = request.body;

    const validation = choiceSchema.validate(choicePosted);
    if(validation.error){
        return response.status(422).send('Todos os dados são obrigatórios!!')
    }

    next();
}