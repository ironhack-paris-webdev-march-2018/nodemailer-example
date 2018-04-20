const nodemailer = require('nodemailer');
const express = require('express');

const router  = express.Router();

const transport =
  nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.gmail_user,
      pass: process.env.gmail_pass
    }
  });

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/contact', (req, res, next) => {
  res.render('contact-page');
});

router.post('/process-message', (req, res, next) => {
  const { sender, senderEmail, message } = req.body;

  transport.sendMail({
    from: 'Your Website <website@example.com>',
    to: process.env.gmail_user,
    subject: `${sender} is trying to contact you`,
    text: `
      Name: ${sender}
      Email: ${senderEmail}
      Message: ${message}
    `,
    html: `
      <h1>Contact Form Message</h1>
      <p>Name: <b>${sender}</b></p>
      <p>Email: ${senderEmail}</p>
      <p>Message: ${message}</p>
    `
  })
  .then(() => {
    res.redirect('/');
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
