import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly userService: UsersService) {
    super({
      clientID: 485471973237814,
      clientSecret: 'b5cf14be8327c9016885f950b7859526',
      callbackURL: 'http://localhost:3000/facebook/redirect',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, id } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      Facebook_id: id,
    };
    //await this.user_profile(user);
    const payload = {
      user,
      accessToken,
    };
    console.log(payload);

    done(null, payload);
  }

  async user_profile(user: any) {
    const newReg = new RegistrationReqModel();

    newReg.email = user.email;
    newReg.firstName = user.firstName;
    newReg.lastName = user.lastName;

    const op = await this.userService.registerUser(newReg);
    console.log(op);
  }
}
