import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bootstrap and playground of becoming full stack developer!';
  }
}
