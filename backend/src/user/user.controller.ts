import { Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CurrentUser } from '../auth/decorators/user.decorator.js';
import { Auth } from '../auth/decorators/auth.decorator.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id)
  }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favourites/:productId')
  async toggleFavourite(
    @CurrentUser('id') id: string,
    @Param('productId') productId: string
  ) {
    return this.userService.toggleFavourite(id, productId)
  }
}
