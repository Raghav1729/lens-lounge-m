import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JsonUtils } from './helpers/json-utils';
import { UuidErrorResolver } from './helpers/uuid-error-resolver';
import { KeyResolver } from './helpers/key-resolver';
import { PaginatorDto } from './helpers/paginator.dto';
import { BlogExistValidationPipe } from './pipes/blog-exist-validation.pipe';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { PostExistValidationPipe } from './pipes/post-exist-validation.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { BlogExistsValidator } from './validators/blog-exists.validator';
import { CodeExistsValidator } from './validators/code-exists.validator';
import { EmailAndLoginNotExistValidator } from './validators/email-and-login-not-exist.validator';
import { IsArrayValidator } from './validators/is-array.validator';
import { LoginEmailExistsValidator } from './validators/login-email-exists.validator';
import { FileConstraintsDto } from './pipes/file-constraints/file-constraints.dto';
import { BloggerBlogsRepo } from '../../../backend/src/features/blogger-blogs/infrastructure/blogger-blogs.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloggerBlogsEntity } from '../../../backend/src/features/blogger-blogs/entities/blogger-blogs.entity';
import { PostsRepo } from '../../../backend/src/features/posts/infrastructure/posts-repo';
import { PostsEntity } from '../../../backend/src/features/posts/entities/posts.entity';
import { LikeStatusPostsRepo } from '../../../backend/src/features/posts/infrastructure/like-status-posts.repo';
import { LikeStatusPostsEntity } from '../../../backend/src/features/posts/entities/like-status-posts.entity';
import { UsersRepo } from '../../../backend/src/features/users/infrastructure/users-repo';
import { UsersEntity } from '../../../backend/src/features/users/entities/users.entity';
import { GamePairsRepo } from '../../../backend/src/features/pair-game-quiz/infrastructure/game-pairs.repo';
import { PairsGameEntity } from '../../../backend/src/features/pair-game-quiz/entities/pairs-game.entity';
import { ChallengesQuestionsRepo } from '../../../backend/src/features/pair-game-quiz/infrastructure/challenges-questions.repo';
import { ChallengeQuestionsEntity } from '../../../backend/src/features/pair-game-quiz/entities/challenge-questions.entity';
import { GameQuestionsRepo } from '../../../backend/src/features/pair-game-quiz/infrastructure/game-questions.repo';
import { QuestionsQuizEntity } from '../../../backend/src/features/sa-quiz-questions/entities/questions-quiz.entity';

const validators = [
  IsArrayValidator,
  PostExistValidationPipe,
  FileValidationPipe,
  BlogExistsValidator,
  BlogExistValidationPipe,
  PostExistValidationPipe,
  CodeExistsValidator,
  EmailAndLoginNotExistValidator,
  LoginEmailExistsValidator,
];
const dtos = [FileConstraintsDto, PaginatorDto];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      BloggerBlogsEntity,
      PostsEntity,
      LikeStatusPostsEntity,
      PairsGameEntity,
      QuestionsQuizEntity,
      ChallengeQuestionsEntity,
    ]),
  ],
  providers: [
    CommonService,
    TrimPipe,
    JsonUtils,
    UuidErrorResolver,
    KeyResolver,
    UsersRepo,
    PostsRepo,
    BloggerBlogsRepo,
    LikeStatusPostsRepo,
    GamePairsRepo,
    GameQuestionsRepo,
    ChallengesQuestionsRepo,
    ...dtos,
    ...validators,
  ],
  exports: [CommonService],
})
export class CommonModule {}
