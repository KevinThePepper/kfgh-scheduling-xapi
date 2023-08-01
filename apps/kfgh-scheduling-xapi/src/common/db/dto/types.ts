import { PageOptionsDto } from "./page-options.dto";

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}
