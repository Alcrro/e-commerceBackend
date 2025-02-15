export interface IMetadata {
  metadata: {
    title: string;
    description?: string;
    keywords?: string[];
    author?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    canonicalUrl?: string;
    robotsMeta?: string;
    theme?: string;
    layout?: string;
    customCSS?: string;
    scripts?: string[];
    status: 'draft' | 'published';
    publishedAt?: Date;
    bannerImage?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface IHomePage {
  metadata: IMetadata;
}
