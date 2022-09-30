import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
const PORT = process.env.PORT;
config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '815071212567-cpknas6s4e1oc9lh8bi7n1oefbsiqqu9.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: `http://localhost:${PORT}/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      password: accessToken,
    };
    //console.log(PORT);
    done(null, user);
  }
}
