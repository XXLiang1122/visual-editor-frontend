import { TemplateInfo } from './index'

export interface SearchQuery {
  page: number;
  pageSize: number;
}

export interface ListItem {
  _id: string;
  title: string;
  desc: string;
  coverUrl: string;
}

export interface TemplateDetail {
  author: string;
  coverUrl: string;
  createdAt: string;
  desc: string;
  template: TemplateInfo;
  title: string;
  updatedAt: string;
  _id: string;
}