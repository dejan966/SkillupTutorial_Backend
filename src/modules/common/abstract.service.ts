import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import Logging from 'library/Logging'
import { Repository } from 'typeorm'

@Injectable()
export class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}
}
