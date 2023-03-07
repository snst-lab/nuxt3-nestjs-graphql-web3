export interface Blogs {
  contents?: ContentsEntity[] | null;
  totalCount: number;
  offset: number;
  limit: number;
}
export interface ContentsEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: Eyecatch;
  category: Category;
}
export interface Eyecatch {
  url: string;
  height: number;
  width: number;
}
export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
}
