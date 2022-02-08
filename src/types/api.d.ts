export interface ResponseData<T> {
  data: T;
  code: number;
  msg: string;
}