type ProviderInfo = {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
};

type Provider = {
  id: 238;
  results: {
    [key: string]: {
      link: string;
      buy: ProviderInfo[];
      rent: ProviderInfo[];
      flatrate: ProviderInfo[];
    };
  };
};
