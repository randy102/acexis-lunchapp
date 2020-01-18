import { createParamDecorator, applyDecorators, SetMetadata } from '@nestjs/common';

export const ArgsMetaData =(data: string) => {
  return applyDecorators(SetMetadata('data', data))
}