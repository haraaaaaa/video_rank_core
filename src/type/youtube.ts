interface YoutubeVideos {
    kind: string,
    etag: string,
    items: YoutubeVideo[]
    nextPageToken: string,
    pageInfo: {
      totalResults: number,
      resultsPerPage: number
    }
  }
  interface YoutubeVideo {
    kind: string,
    etag: string,
    id: string,
    snippet: YoutubeVideoSnippet
  }

  interface YoutubeVideoSnippet { 
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: YoutubeVideoThumbnails,
    channelTitle: string,
    tags: string[],      
    categoryId: number,
    liveBroadcastContent: string,
    localized: YoutubeVideoLocalized,
    defaultAudioLanguage: string
  }

  interface YoutubeVideoThumbnails {
    default: YoutubeVideoThumbnail,
    medium: YoutubeVideoThumbnail,
    high: YoutubeVideoThumbnail,
    standard: YoutubeVideoThumbnail,
    maxres: YoutubeVideoThumbnail
  }

  interface YoutubeVideoThumbnail {
    url: string,
    width: number,
    height: number
  }

  interface YoutubeVideoLocalized {
    title: string,
    description: string
  }
