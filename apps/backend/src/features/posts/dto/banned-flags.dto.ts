import { IsBoolean } from 'class-validator';

export class BannedFlagsDto {
  @IsBoolean()
  commentatorInfoIsBanned: boolean;

  @IsBoolean()
  dependencyIsBanned: boolean;

  @IsBoolean()
  banInfoIsBanned: boolean;

  @IsBoolean()
  isBanned: boolean;

  constructor(
    commentatorInfoIsBanned: boolean,
    dependencyIsBanned: boolean,
    banInfoIsBanned: boolean,
    isBanned: boolean,
  ) {
    this.commentatorInfoIsBanned = commentatorInfoIsBanned;
    this.dependencyIsBanned = dependencyIsBanned;
    this.banInfoIsBanned = banInfoIsBanned;
    this.isBanned = isBanned;
  }
}
