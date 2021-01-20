export interface InputParams {
  key: string,
  info: string,
  placeholder: string,
}

export interface RouteTypes {
  key: string;
  path: string;
  component?: any;
  exact?: boolean;
}