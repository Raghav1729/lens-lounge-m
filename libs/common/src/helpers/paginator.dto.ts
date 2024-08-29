import { IsArray, IsNumber, IsObject } from 'class-validator';
import { UsersEntity } from '../../../../apps/backend/src/features/users/entities/users.entity';
import { SaUserViewModel } from '../../../../apps/backend/src/features/sa/views/sa-user-view-model';
import { CommentViewModel } from '../../../../apps/backend/src/features/comments/views/comment.view-model';
import { PostWithLikesInfoViewModel } from '../../../../apps/backend/src/features/posts/views/post-with-likes-info.view-model';
import { BloggerBlogsViewModel } from '../../../../apps/backend/src/features/blogger-blogs/views/blogger-blogs.view-model';
import { BannedUserForBlogViewModel } from '../../../../apps/backend/src/features/users/views/banned-user-for-blog.view-model';
import { QuestionsViewModel } from '../../../../apps/backend/src/features/sa-quiz-questions/views/questions.view-model';
import { GameViewModel } from '../../../../apps/backend/src/features/pair-game-quiz/views/game.view-model';
import { GamesStatisticsViewModel } from '../../../../apps/backend/src/features/pair-game-quiz/views/games-statistics.view-model';
import { BloggerBlogsWithImagesViewModel } from '../../../../apps/backend/src/features/blogger-blogs/views/blogger-blogs-with-images.view-model';
import { BloggerBlogsWithImagesSubscribersViewModel } from '../../../../apps/backend/src/features/blogger-blogs/views/blogger-blogs-with-images-subscribers.view-model';

export class PaginatorDto {
  @IsNumber()
  pagesCount: number;

  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;

  @IsNumber()
  totalCount: number;

  @IsArray()
  @IsObject({ each: true })
  items: (
    | UsersEntity
    | SaUserViewModel
    | CommentViewModel
    | PostWithLikesInfoViewModel
    | BloggerBlogsViewModel
    | BannedUserForBlogViewModel
    | QuestionsViewModel
    | GameViewModel
    | GamesStatisticsViewModel
    | BloggerBlogsWithImagesViewModel
    | BloggerBlogsWithImagesSubscribersViewModel
  )[];
}
