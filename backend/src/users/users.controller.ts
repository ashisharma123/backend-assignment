import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { query } from 'express';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { UsersService } from './users.service';
const PORT = process.env.PORT;
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('registration')
  async registerUser(@Body() reg: RegistrationReqModel) {
    return await this.userService.registerUser(reg);
  }

  @Get('login')
  async loginUser(@Query('email') email: string, @Res() res) {
    console.log('adjnjcd');
    return this.userService.login(email);
  }

  @Get('login1')
  async login(@Query('email') email: string, @Res() res) {
    const ad = await this.userService.login(email);
    console.log(ad);
    const code = await ad.message.password;
    console.log(code);

    return res.redirect(`http://localhost:${PORT}/users/getUser?code=${code}`);
  }

  @Get('getUser')
  async getUser(@Query('code') code: string) {
    return this.userService.getuser(code);
  }

  @Get('delete')
  async deleteUser(@Query('email') email: string) {
    return this.userService.deleteUser(email);
  }

  @Post('update')
  async update(@Body() reg: RegistrationReqModel) {
    return this.userService.updateUser(reg);
  }
}
