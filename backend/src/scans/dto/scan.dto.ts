import { IsString, Length } from 'class-validator';

export class ScanDto {
  @IsString()
  @Length(32, 32)
  qrSecretString: string;
}
