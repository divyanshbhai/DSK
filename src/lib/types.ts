export type Service = {
  id: string;
  category: string;
  name: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  link: string;
  isOfficial: boolean;
};

export type Category = {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  icon: string;
};

export type Shortcut = {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  link: string;
  category: {
    en: string;
    hi: string;
  };
  icon: string;
};
