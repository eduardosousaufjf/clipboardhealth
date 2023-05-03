import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

export function CustomRepository(
  entity: () => CustomDecorator<string>,
): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
