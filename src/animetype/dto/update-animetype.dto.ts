import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimetypeDto } from './create-animetype.dto';

export class UpdateAnimetypeDto extends PartialType(CreateAnimetypeDto) {}
