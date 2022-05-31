export class ContentList {
  public type: ContentType;
  public list: Content[];
}
export class Content {
  public name: string;
  public text: string;
  public url: string;
  public type: ContentType;
}

export enum ContentType {
  jpns1611 = 'JPNS1611',
  writ1000 = 'WRIT1000',
}