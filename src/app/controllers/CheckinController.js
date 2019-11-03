import { subDays, startOfDay } from 'date-fns';

import Checkin from '../schemas/Checkin';

class CheckinController {
  async index(req, res) {
    const { id: student_id } = req.params;
    const studentCheckins = await Checkin.find({
      student_id,
    });

    return res.json(studentCheckins);
  }

  async store(req, res) {
    const { id: student_id } = req.params;

    const daysLimit = 7;
    const checkinsLimit = 5;
    const currentDate = new Date();
    const limitDate = startOfDay(subDays(currentDate, daysLimit));

    const studentCheckins = await Checkin.find({
      student_id,
      createdAt: { $gte: limitDate, $lte: currentDate },
    });

    if (studentCheckins && studentCheckins.length >= checkinsLimit) {
      return res.status(401).json({
        error: `You've reached the limit of ${checkinsLimit} checkins per ${daysLimit} consecutives days.`,
      });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
