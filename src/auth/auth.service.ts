import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from 'entities/user.entity'
import Logging from 'library/Logging'
import { UsersService } from 'modules/users/users.service'
import { compareHash } from 'utils/bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configServie: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    Logging.info('Validating user...')
    const user = await this.usersService.findBy({ email: email })
    if (!user) {
      throw new BadRequestException('Invalid credentials')
    }
    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('Invalid credentials')
    }
    Logging.info('User is valid')
    return user
  }
}
