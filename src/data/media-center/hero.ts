export class MediaCenterHero {
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  buttonLink: string;
  news1: {
    id: number;
    thumbnail: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
  };
  news2: {
    id: number;
    thumbnail: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
  };
  news3: {
    id: number;
    thumbnail: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
  };
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.description = data.description;
    this.buttonLink = data.button_link;
    this.news1 = {
      id: data.news_1.id,
      thumbnail: data.news_1.thumbnail,
      title: data.news_1.title,
      slug: data.news_1.slug,
      description: data.news_1.description,
      createdAt: data.news_1.created_at,
    };
    this.news2 = {
      id: data.news_2.id,
      thumbnail: data.news_2.thumbnail,
      title: data.news_2.title,
      slug: data.news_2.slug,
      description: data.news_2.description,
      createdAt: data.news_2.created_at,
    };
    this.news3 = {
      id: data.news_3.id,
      thumbnail: data.news_3.thumbnail,
      title: data.news_3.title,
      slug: data.news_3.slug,
      description: data.news_3.description,
      createdAt: data.news_3.created_at,
    };
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
