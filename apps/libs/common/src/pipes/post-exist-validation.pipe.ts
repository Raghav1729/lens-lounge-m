import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { PostsEntity } from '../../../../backend/src/features/posts/entities/posts.entity';
import { PostsRepo } from '../../../../backend/src/features/posts/infrastructure/posts-repo';

@Injectable()
export class PostExistValidationPipe implements PipeTransform {
  constructor(private postsRepo: PostsRepo) {}

  async transform(value: string): Promise<string> {
    const post: PostsEntity | null =
      await this.postsRepo.getPostByIdWithoutLikes(value);
    if (!post) {
      throw new NotFoundException(`Post with id: ${value} not found`);
    }
    return value;
  }
}
