
module.exports = (sequelize, DataTypes) => {

    let contents = sequelize.define('contents', {
        firstname: {
            type: DataTypes.STRING,
            require: true
        },
        lastname: {
            type: DataTypes.STRING,
            require: true
        },
        matiere: {
            type: DataTypes.STRING,
            require: true
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return contents;
};
