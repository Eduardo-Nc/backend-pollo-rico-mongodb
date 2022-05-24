const sgMail = require('@sendgrid/mail');


const sendEmail = (to, subject, html) => {


    return new Promise((resolve, reject) => {

        // console.log(process.env.SENDGRID_API_KEY)

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to,
            from: 'eduardo-negron@live.com', // Use the email address or domain you verified above
            subject,
            html,
        };

        sgMail
            .send(msg)
            .then(() => {
                resolve(true);
            }, error => {
                console.error(error);
                reject(false);
                if (error.response) {

                    console.error(error.response.body)
                    reject(false);
                }
            })
    })

}

module.exports = {
    sendEmail
}