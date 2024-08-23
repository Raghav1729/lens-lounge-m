import { IsArray, IsNumber, IsObject } from 'class-validator';
import { UsersEntity } from '../../../../backend/src/features/users/entities/users.entity';
import { SaUserViewModel } from '../../../../backend/src/features/sa/views/sa-user-view-model';
import { CommentViewModel } from '../../../../backend/src/features/comments/views/comment.view-model';
import { PostWithLikesInfoViewModel } from '../../../../backend/src/features/posts/views/post-with-likes-info.view-model';
import { BloggerBlogsViewModel } from '../../../../backend/src/features/blogger-blogs/views/blogger-blogs.view-model';
import { BannedUserForBlogViewModel } from '../../../../backend/src/features/users/views/banned-user-for-blog.view-model';
import { QuestionsViewModel } from '../../../../backend/src/features/sa-quiz-questions/views/questions.view-model';
import { GameViewModel } from '../../../../backend/src/features/pair-game-quiz/views/game.view-model';
import { GamesStatisticsViewModel } from '../../../../backend/src/features/pair-game-quiz/views/games-statistics.view-model';
import { BloggerBlogsWithImagesViewModel } from '../../../../backend/src/features/blogger-blogs/views/blogger-blogs-with-images.view-model';
import { BloggerBlogsWithImagesSubscribersViewModel } from '../../../../backend/src/features/blogger-blogs/views/blogger-blogs-with-images-subscribers.view-model';

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
