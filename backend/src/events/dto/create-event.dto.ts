import { IsString, IsBoolean, IsOptional, MaxLength, IsDateString, IsIn, IsInt, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MaxLength(128)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  showTeamLocation?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['en-US', 'el'])
  language?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  firstFinishBonus?: number;
}
