export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly file?: string;
  readonly userId?: number;
}
