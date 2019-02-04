module.exports = class {
    constructor(nodemailer, knex) {
        this.nodemailer = nodemailer;
        this.knex = knex
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.SECURITY,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        })
    }

    async sendOfferNotification(product_id) {
        try {
            let product = await this.knex('products').where('product_id', product_id)
            product = product[0]
            let user = await this.knex('users_credential').where('user_id', product.uploaded_by)
            user = user[0]
            const mailOptions = {
                from: '"Testing" <Testing>',
                to: user.email,
                subject: 'Your Product has recieved offer', // Subject line
                html: `<p>Heads Up!Your product ${product.name} has been offered<p>` +
                    `<p>Visit <a>${process.env.FRONTEND_URL}/userPage</a>to view your offer</p>` +
                    `<p>This is an automatic message sent by system, please do not reply to this message</p>`// html body
            };
            this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw err
        }
    }

    async sendAcceptOfferNotification(product_id) {
        try {
            let product = await this.knex('products').where('product_id', product_id)
            product = product[0]
            let user = await this.knex('users_credential').where('user_id', product.uploaded_by)
            user = user[0]
            const mailOptions = {
                from: '"Testing" <Testing>',
                to: user.email,
                subject: 'Your Offer has been Accepted', // Subject line
                html: `<p>Heads Up!Your offer on roduct ${product.name} has been accept<p>` +
                    `<p>Visit <a>${process.env.FRONTEND_URL}</a>to manage the trade</p>` +
                    `<p>This is an automatic message sent by system, please do not reply to this message</p>`// html body
            };
            this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw err
        }
    }
}