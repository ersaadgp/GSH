require('dotenv').config();
const nodemailer = require('nodemailer');

class Email {
  createTransporter = () => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD,
      },
    });

    return transporter;
  };

  emailBuilder = (emailAddresses) => {
    const emailAddressList = emailAddresses.join(', ');

    const mailOptions = {
      from: 'istamar.siddiq.tif17@polban.ac.id',
      to: emailAddressList,
      subject: 'Test Email',
      html: `<html><div>Greetings.</div><div>It's a new project coming up for you. Go check that <a href="http://localhost:3000">here</a></div></html>`,
    };

    return mailOptions;
  };

  send = (emailAddresses) => {
    const email = this.emailBuilder(emailAddresses);
    const transporter = this.createTransporter();

    transporter.sendMail(email, (error, info) => {
      if (Object.keys(error).length !== 0) {
        console.log(error);
      }

      console.log(info);
    });
  };
}

module.exports = new Email();
