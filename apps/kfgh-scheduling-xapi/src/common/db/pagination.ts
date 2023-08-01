import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { PageDto, PageMetaDto, PageOptionsDto } from "./dto";

export const paginate = async <TEntity extends ObjectLiteral = any>(
  qb: SelectQueryBuilder<TEntity>,
  pageOptions?: PageOptionsDto,
): Promise<PageDto<TEntity>> => {
  const { skip, take, order } = pageOptions ?? new PageOptionsDto();
  qb.orderBy("id").skip(skip).take(take).orderBy("id", order);

  const itemCount = await qb.getCount();
  const { entities } = await qb.getRawAndEntities();

  const pageMetaDto = new PageMetaDto({
    itemCount,
    pageOptionsDto: pageOptions,
  });

  return new PageDto(entities, pageMetaDto);
};
