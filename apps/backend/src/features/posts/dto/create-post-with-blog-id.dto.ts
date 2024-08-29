import { IsNotEmpty, Length, Validate } from 'class-validator';
import { BlogExistsValidator } from '../../../../../../libs/common/src/validators/blog-exists.validator';

export class CreatePostWithBlogIdDto {
  @IsNotEmpty()
  @Length(1, 30, {
    message: 'Title must be between 1 and 30 characters.',
  })
  title: string;

  @IsNotEmpty()
  @Length(1, 100, {
    message: 'Short description must be between 1 and 100 characters.',
  })
  shortDescription: string;

  @IsNotEmpty()
  @Length(1, 1000, {
    message: 'Content must be between 1 and 1000 characters.',
  })
  content: string;

  @IsNotEmpty()
  @Length(1, 100, {
    message: 'Blog ID must be between 1 and 100 characters.',
  })
  @Validate(BlogExistsValidator)
  blogId: string;

  constructor(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
  ) {
    this.title = title;
    this.shortDescription = shortDescription;
    this.content = content;
    this.blogId = blogId;
  }
}
