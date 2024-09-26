const verify = async (req, res, next) => {

    const { body } = req;

    const requirements = [
        'attributes', 'equipment', 'inventory', 'name', 'nickname',
        'email', 'level', 'experience', 'is_active', 'profile', 'tasks',
        'gold', 'created_date'
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

module.exports = { verify, verifyGetOneByEmail}