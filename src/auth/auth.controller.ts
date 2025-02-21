import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: AuthCredentialsDto })
  @ApiCreatedResponse({
    description: 'Returns a jwt token on success',
    example: { access_token: 'jwt' },
  })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials' })
  login(@GetUser() user: User) {
    return this.authService.login(user);
  }
}
