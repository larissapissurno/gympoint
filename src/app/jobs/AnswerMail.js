import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;
    const { student } = helpOrder;
    const [userFirstName] = student.name.split(' ');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Pergunta respondida',
      template: 'answer',
      context: {
        userFirstName,
        helpOrder,
      },
    });
  }
}

export default new AnswerMail();
