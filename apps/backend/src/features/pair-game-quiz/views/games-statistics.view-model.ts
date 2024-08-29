import { IsString, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Player {
  @IsString()
  id: string;

  @IsString()
  login: string;

  constructor(id: string, login: string) {
    this.id = id;
    this.login = login;
  }
}

export class GamesStatisticsViewModel {
  @IsNumber()
  sumScore: number;

  @IsNumber()
  avgScores: number;

  @IsNumber()
  gamesCount: number;

  @IsNumber()
  winsCount: number;

  @IsNumber()
  lossesCount: number;

  @IsNumber()
  drawsCount: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Player)
  player: Player;

  constructor(
    sumScore: number,
    avgScores: number,
    gamesCount: number,
    winsCount: number,
    lossesCount: number,
    drawsCount: number,
    player: Player,
  ) {
    this.sumScore = sumScore;
    this.avgScores = avgScores;
    this.gamesCount = gamesCount;
    this.winsCount = winsCount;
    this.lossesCount = lossesCount;
    this.drawsCount = drawsCount;
    this.player = player;
  }
}
