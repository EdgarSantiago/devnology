export type typeLink = {
  label: string;
  link: string;
};

export interface DataLinks {
  links: typeLink[];
  status: string;
}

export interface DataOneLink {
  link: typeLink;
  status: string;
}
