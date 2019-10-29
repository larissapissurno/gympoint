import Plan from '../models/Plan';

export default async (req, res, next) => {
  const { id } = req.params;
  const plan = await Plan.findByPk(id);

  if (!plan) {
    return res.status(400).json({ error: 'Plan not found.' });
  }

  req.plan = plan;

  return next();
};
