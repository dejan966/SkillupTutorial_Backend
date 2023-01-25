import { IsNotEmpty } from 'class-validator'

export class CreateUpdateRoleDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty({ message: 'There should be atleast one permission selected' })
  permissions: string[]
}
