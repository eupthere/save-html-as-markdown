export type ExtractPageRequest = {
  type: 'EXTRACT_PAGE';
};

export type GetMetadataRequest = {
  type: 'GET_METADATA';
};

export type PageMetadata = {
  type: 'PAGE_METADATA';
  title: string;
  author: string;
  description: string;
  domain: string;
  site: string;
  wordCount: number;
  url: string;
};

export type DownloadMarkdownRequest = {
  type: 'DOWNLOAD_MD';
  markdown: string;
  filename: string;
};

export type ContentMessage = ExtractPageRequest | GetMetadataRequest;
export type BackgroundMessage = DownloadMarkdownRequest;
