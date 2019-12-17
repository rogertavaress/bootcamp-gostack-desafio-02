import Sequelize, { Model } from 'sequelize';

class Student extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                idade: Sequelize.INTEGER,
                peso: Sequelize.DECIMAL,
                altura: Sequelize.DECIMAL,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Student;
