// src/app.module.ts
import { MailerModule } from '@nestjs-modules/mailer';
// ... other imports

@Module({
imports: [
MailerModule.forRoot({
transport: {
host: 'smtp.gmail.com',
port: 465, // <-- Essential for secure connection
secure: true, // <-- Essential for port 465 (SSL)
auth: {
user: process.env.EMAIL_USER, // Your full Gmail address
pass: process.env.EMAIL_PASS, // The 16-character App Password
},
},
// ... rest of your MailerModule options
}),
],
// ...
})
export class AppModule {}











import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  // 1. Inject the MailerService
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(
    email: string,
    name: string,
    token: string,
  ) {
    // 2. The URL the user clicks to confirm their account
    const url = `http://localhost:3000/auth/confirm?token=${token}`;

    try {
        // 3. Use the injected service to send the email
        await this.mailerService.sendMail({
          to: email, // Recipient email address
          subject: 'Welcome Aboard! Confirm Your Email', // Subject line
          // For simple emails, you can use text or HTML:
          // text: `Hello ${name}, please click the link to confirm: ${url}`,
          html: `
            <h1>Hello ${name},</h1>
            <p>Welcome to the future of awesome apps! Please confirm your email by clicking the button below:</p>
            <a href="${url}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Confirm Account
            </a>
            <p>If you didn't sign up, just ignore this email.</p>
          `,
        });
        this.logger.log(`Confirmation email successfully sent to: ${email}`);
        return true;
    } catch (error) {
        this.logger.error(`Failed to send confirmation email to ${email}`, error.stack);
        // Handle error (e.g., log it, retry, or notify administrator)
        return false;
    }
  }
}











import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      // 1. Configure the transport object
      transport: {
        host: 'smtp.gmail.com', // Use your email provider's SMTP host
        port: 465, // Use the correct port (465 for SSL, 587 for TLS)
        secure: true, // true for 465, false for 587
        auth: {
          // Use environment variables for security!
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      // 2. Optional: Global 'from' address
      defaults: {
        from: '"No Reply" <noreply@yourdomain.com>',
      },
      // 3. Optional: Use Handlebars for templates (more on this later!)
      // template: {
      //   dir: __dirname + '/templates', // Path to your email templates
      //   adapter: new HandlebarsAdapter(), // Or another adapter
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
