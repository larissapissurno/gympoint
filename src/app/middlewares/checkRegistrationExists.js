import Registration from '../models/Registration';

export default async (req, res, next) => {
  const { id } = req.params;
  const registration = await Registration.findByPk(id);

  if (!registration) {
    return res.status(400).json({ error: 'Registration not found.' });
  }

  req.registration = registration;

  return next();
};
