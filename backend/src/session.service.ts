import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class SessionService {
  private storeClient = createClient({ url: 'redis://localhost:6379' });
  constructor() {
    this.storeClient.connect();
  }

  async createSession(key: string, value: string) {
    await this.storeClient.set(key, value);
    await this.storeClient.expire(key, 60 * 2);
    return true;
  }

  getSession(key: string) {
    const data = this.storeClient.get(key);
    if (!data) throw new HttpException('Key Not Found', HttpStatus.NOT_FOUND);
    return data;
  }
}
