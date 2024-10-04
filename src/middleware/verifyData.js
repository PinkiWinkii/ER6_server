const verify = async (req, res, next) => {

    const { body } = req;

    const requirements = [
        'attributes', 'equipment', 'inventory', 'name', 'nickname',
        'email', 'level', 'experience', 'is_active', 'profile', 'tasks',
        'gold', 'created_date', 'role', 'isInsideLab', 'socketId', 'avatar'
    ];

    const missingField = requirements.find(key => body[key] == null);

    if(missingField){

        return res.status(400).send({
            status: "FAILED",
            error: `Key '${missingField} is missing or is null / undefined'`
        });
    }

    next();
}

const verifyGetOneByEmail = async (req, res, next) => {
    
    const { params : { playerEmail }} = req;

    if(!playerEmail){

        return res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter 'email' can not be empty"}
        })
    }

    next();
}

const verifyId = async (req, res, next) => {

    const { params: {playerId} } = req;

    if(!playerId){
        return res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter id can not be empty"}
        })
    }

    next();
}

const verifyEmail = async (req, res, next) => {
    
    const { params: {playerEmail}} = req;

    if(!playerEmail){
        return res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter email can not be empty"}
        });
    }

    next();
}

module.exports = {  verify, verifyGetOneByEmail, verifyId,
                    verifyEmail
}