import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Request,
  RequestMethod,
  Req,
  Redirect,
  Res,
  Header,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { RegistrationReqModel } from './models/registration.req.model';
import { SessionService } from './session.service';
import { UsersService } from './users/users.service';

const PORT = process.env.PORT;

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sessionService: SessionService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  async getHello() {
    // const ash = await this.sessionService.getSession('ash');
    // console.log(ash);
    return this.appService.getHello();
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res) {
    console.log(req.user.password, '1');
    const reg = new RegistrationReqModel();

    reg.email = req.user.email;
    reg.firstName = req.user.firstName;
    reg.lastName = req.user.lastName;
    reg.password = req.user.password;

    console.log(await this.userService.registerUser(reg), 'print');
    //console.log(op);
    //const log = await this.userService.login(req.user.email);
    //console.log(log);
    //return this.appService.googleLogin(req);

    return res.redirect(
      `http://localhost:${PORT}/users/login1?email=${req.user.email}`,
    );
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return HttpStatus.OK;
    //return 'fdnjs';
  }

  @Get('google1')
  @UseGuards(AuthGuard('google'))
  async googleAuth1(@Req() req) {
    return HttpStatus.OK;
    //return 'fdnjs';
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    //console.log(req.user, '1');
    const reg = new RegistrationReqModel();

    reg.email = req.user.email;
    reg.firstName = req.user.firstName;
    reg.lastName = req.user.lastName;
    reg.password = req.user.password;

    const op = await this.userService.registerUser(reg);
    //console.log(op);
    //const log = await this.userService.login(req.user.email);
    //console.log(log);
    //return this.appService.googleLogin(req);

    return res.redirect(
      `http://localhost:${PORT}/users/login1?email=${req.user.email}`,
    );
  }
}
// /Users/ashishsharma/Downloads/assignment_backend/assignment
