import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, registration } = data;
    const [userFirstName] = student.name.split(' ');
    const monthlyPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(registration.price / plan.duration);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula confirmada',
      template: 'registration',
      context: {
        userFirstName,
        planTitle: `${plan.title} (${plan.duration} ${
          plan.duration === 1 ? 'mês' : 'meses'
        })`,
        monthlyPrice,
        startDate: format(parseISO(registration.start_date), 'dd/MM/yyyy', {
          locale: pt,
        }),
        endDate: format(parseISO(registration.end_date), 'dd/MM/yyyy', {
          locale: pt,
        }),
      },
    });
  }
}

export default new RegistrationMail();
