type ReleaseDate = {
  id: number;
  results: {
    iso_3166_1: string;
    descriptors: string[];
    rating: string;
    release_dates: {
      certification: string;
      descriptors: string[];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }[];
  }[];
};
