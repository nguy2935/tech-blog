const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}


Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references {
                model: "post",
                key: "id"  
            }
        }
    },
    {
        // pass sequelize connection to database
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
);

module.exports = Comment;