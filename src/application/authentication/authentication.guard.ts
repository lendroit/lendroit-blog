import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const headers = context.switchToHttp().getRequest().headers;

    const user = await this.authenticationService.validateUser(headers.name, headers.password);
    if (user) {
      return true;
    }
    return false;
  }
}
