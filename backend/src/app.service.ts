import { Injectable } from '@nestjs/common';
const PORT = process.env.PORT;
@Injectable()
export class AppService {
  getHello(): string {
    return `Server running on ${PORT}`;
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
