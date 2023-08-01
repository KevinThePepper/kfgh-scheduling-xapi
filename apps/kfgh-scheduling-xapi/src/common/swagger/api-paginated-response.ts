import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "../db";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  description = "Successfully received model list",
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiExtraModels(PageDto),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
