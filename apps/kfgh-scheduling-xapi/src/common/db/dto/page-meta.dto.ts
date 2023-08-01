import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDtoParameters } from "./types";

export class PageMetaDto {
  @ApiProperty({ description: "The current page number" })
  readonly page: number;

  @ApiProperty({
    description: "The number of results to limit the response to",
  })
  readonly take: number;

  @ApiProperty({ description: "The number of items in this response" })
  readonly itemCount: number;

  @ApiProperty({ description: "The total number of pages in the result set" })
  readonly pageCount: number;

  @ApiProperty({ description: "Whether there is a previous page" })
  readonly hasPreviousPage: boolean;

  @ApiProperty({ description: "Whether there is a next page" })
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
