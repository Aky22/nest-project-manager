import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async signIn(): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user: JwtPayload = { username: 'test' };
    return this.jwtService.sign(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.validate(username, password);
  }

  public async login(username: string, password: string): Promise<any | { status: number }> {
    return this.validateUser(username, password).then((userData) => {
      if (!userData) {
        return { status: 404 };
      }
      const payload = {
        username: userData.username,
        id: userData.id,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: payload,
        status: 200,
      };

    });
  }

}
