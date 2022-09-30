import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { RegistrationRespModel } from 'src/models/registration.resp.model';
import { Repository } from 'typeorm';
import { User } from './user';
import * as bcrypt from 'bcrypt';
import { SessionService } from 'src/session.service';
import passport from 'passport';

@Injectable()
export class UsersService extends SessionService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super();
  }

  private async registrationValidation(
    regModel: RegistrationReqModel,
  ): Promise<string> {
    if (!regModel.email) {
      return "Email can't be empty";
    }

    const emailRule =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRule.test(regModel.email.toLowerCase())) {
      return 'Invalid email';
    }

    //console.log(this.use);
    const user1 = await this.userRepository.findOne({
      where: { email: regModel.email },
    });

    if (user1 != null && user1.email) {
      return 'Email already exist';
    }

    return '';
  }

  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public async registerUser(
    regModel: RegistrationReqModel,
  ): Promise<RegistrationRespModel> {
    const result = new RegistrationRespModel();

    const errorMessage = await this.registrationValidation(regModel);
    if (errorMessage) {
      result.message = errorMessage;
      result.successStatus = false;

      return result;
    }

    const newUser = new User();
    newUser.firstName = regModel.firstName;
    newUser.lastName = regModel.lastName;
    newUser.email = regModel.email;
    if (regModel.password) {
      newUser.password = await this.getPasswordHash(regModel.password);
    }

    if (regModel.age) {
      newUser.age = regModel.age;
    }

    const newUser1 = await this.userRepository.create(newUser);
    console.log(newUser1, '1');
    await this.userRepository.save(newUser1);
    result.successStatus = true;
    result.message = 'success';
    return result;
  }

  public async login(email: string) {
    //write login method
    const data = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!data) {
      throw new HttpException('User Not Found, Register', HttpStatus.NOT_FOUND);
    }

    console.log(data);
    if (!data.password) {
      console.log('use access-token');
    }
    const code = data.password;

    this.createSession(email, code);
    this.createSession(code, email);

    console.log('adsd');
    //let code = this.getSession()

    return {
      statusCode: 200,
      message: data,
    };
  }

  public async getuser(code: string) {
    if (!code)
      throw new HttpException('Code is Required', HttpStatus.BAD_REQUEST);
    const id = await this.getSession(code);
    if (!id)
      throw new HttpException(
        "User's session is not active",
        HttpStatus.UNAUTHORIZED,
      );

    return {
      statusCode: 200,
      message: id,
    };
  }

  public async deleteUser(email: string) {
    const data = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!data) {
      throw new HttpException('user already deleted', HttpStatus.NOT_FOUND);
    }

    const id = data.userId;
    //console.log(data.userId);
    const del = await this.userRepository.delete(id);

    //console.log(del);

    return 'deleted';
  }

  public async updateUser(regModel: RegistrationReqModel) {
    const data = await this.userRepository.findOne({
      where: {
        email: regModel.email,
      },
    });

    if (!data) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }

    const id = data.userId;
    //console.log(data.userId);
    const upd = await this.userRepository.update(id, regModel);

    console.log(upd);

    return 'updated';
  }
}
