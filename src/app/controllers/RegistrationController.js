import * as Yup from 'yup';

import Registration from '../models/Registration';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll();

    return res.json(registrations);
  }

  async show(req, res) {
    return res.json(req.registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    const { student_id, plan_id, start_date } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const registrationExists = await Registration.findOne({
      where: { student_id, plan_id, start_date },
    });

    if (registrationExists) {
      return res.status(400).json({ error: 'Registration already exists.' });
    }

    const registration = await Registration.create(req.body);

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date, end_date } = req.body;

    const registrationExists = await Registration.findOne({
      where: { student_id, plan_id, start_date, end_date },
    });

    if (registrationExists && registrationExists.id !== req.registration.id) {
      return res.status(400).json({ error: 'Registration already exists.' });
    }

    const registration = await req.registration.update(req.body);

    return res.json(registration);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Registration.destroy({
      where: {
        id,
      },
    });

    return res.send();
  }
}

export default new RegistrationController();
