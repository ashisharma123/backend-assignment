import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user';
import { DatabaseModule } from './databaseModule';
import { FacebookStrategy } from './facebook/facebook.startegy';
import { GoogleStrategy } from './google/google.strategy';
import { SessionService } from './session.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy, GoogleStrategy, SessionService],
})
export class AppModule {}
