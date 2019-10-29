import Sequelize, { Model } from 'sequelize';

import Plan from './Plan';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DECIMAL,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async registration => {
      const plan = await Plan.findByPk(registration.plan_id);
      const start_date = new Date(registration.start_date);
      const end_date = new Date(
        start_date.setMonth(start_date.getMonth() + plan.duration)
      );

      registration.price = plan.price * plan.duration;
      registration.end_date = end_date;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id' });
  }
}

export default Registration;
