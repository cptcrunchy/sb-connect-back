module.exports = ({ env }) => ({
    email: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'no-reply@sb-connect.com',
        defaultReplyTo: 'no-reply@sb-connect.com',
      },
    },
  });