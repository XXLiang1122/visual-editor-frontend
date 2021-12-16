export interface ImageItem {
  id: number;
  pageURL: string;
  type: photo;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL:string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views:number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
  collections:number;
}

export interface SearchQuery {
  key: string; // Your API key: 24178889-8dbe9fccf0c585814c1dcb342
  q?: string; // A URL encoded search term. If omitted, all images are returned. This value may not exceed 100 characters.Example: "yellow+flower"
  lang?: string; // Language code of the language to be searched in.Accepted values: cs, da, de, en, es, fr, id, it, hu, nl, no, pl, pt, ro, sk, fi, sv, tr, vi, th, bg, ru, el, ja, ko, zhDefault: "en"
  id?: string; // Retrieve individual images by ID.
  image_type?: string; // Filter results by image type.Accepted values: "all", "photo", "illustration", "vector" Default: "all"
  orientation?: string; //	Whether an image is wider than it is tall, or taller than it is wide.Accepted values: "all", "horizontal", "vertical" Default: "all"
  category?: string; //	Filter results by category.Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music
  min_width?: number; // Minimum image width.Default: "0"
  min_height?: number; //	Minimum image height.Default: "0"
  colors?: string;	// Filter images by color properties. A comma separated list of values may be used to select multiple properties.Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"
  editors_choice?: boolean; //	Select images that have received an Editor's Choice award.Accepted values: "true", "false"Default: "false"
  safesearch?: boolean; //	A flag indicating that only images suitable for all ages should be returned. Accepted values: "true", "false" Default: "false"
  order?: string; //	How the results should be ordered.Accepted values: "popular", "latest" Default: "popular"
  page?: number; //	Returned search results are paginated. Use this parameter to select the page number.Default: 1
  per_page?: number; //	Determine the number of results per page.Accepted values: 3 - 200 Default: 20
  callback?:	string; //	JSONP callback function name
  pretty?: boolean; //	Indent JSON output. This option should not be used in production.Accepted values: "true", "false" Default: "false"
}
