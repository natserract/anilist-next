
export type Media = {
  id: number;
  title: {
    romaji: string;
    english?: string | null;
    native?: string
  }
  description: string
  status: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS"
  startDate: {
    year: number;
    month: number;
    day: string | null;
  }
  endDate: {
    year: number;
    month: number;
    day: string | null;
  }
  coverImage: {
    color: string;
    extraLarge: string;
    large: string;
    medium: string;
    type: string;
    genres: string[]
  }
  characters: {
    nodes: {
      id: number;
      name: {
        full: string;
        native: string
      }
    }[]
  }
}

export type MediaPagination = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export type MediaData = {
  media: Media[];
} & MediaPagination