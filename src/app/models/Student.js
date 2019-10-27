import Sequelize, { Model } from 'sequelize';
import getAge from 'get-age';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        date_of_birth: Sequelize.DATE,
        weight: Sequelize.DECIMAL,
        height: Sequelize.DECIMAL,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return getAge(this.getDataValue('date_of_birth'));
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default Student;
