import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export type prismaExtendedClient = typeof prismaExtendedClient;
export const prismaExtendedClient = (prismaClient: PrismaClient) =>
  prismaClient.$extends({
    query: {
      $allModels: {
        $allOperations({ model, operation, args, query }) {
          return query(args);
        },
        async findMany({ model, operation, args, query }) {
          const target = Prisma.dmmf.datamodel.models.find(
            (m) => m.name === model,
          );

          if (target?.fields.find((m) => m.name === 'deletedAt')) {
            (args as any).where = { ...args.where, deletedAt: null };
          }

          (args as any).where &&
            ((args as any).where = whereSoftDelete((args as any).where, model));
          (args as any).include &&
            ((args as any).include = includeSoftDelete(
              (args as any).include,
              model,
            ));
          (args as any).select &&
            ((args as any).select = selectSoftDelete(
              (args as any).select,
              model,
            ));

          return query(args);
        },

        async findFirst({ model, operation, args, query }) {
          const target = Prisma.dmmf.datamodel.models.find(
            (m) => m.name === model,
          );

          if (target?.fields.find((m) => m.name === 'deletedAt')) {
            (args as any).where = { ...args.where, deletedAt: null };
          }

          (args as any).where &&
            ((args as any).where = whereSoftDelete((args as any).where, model));
          (args as any).include &&
            ((args as any).include = includeSoftDelete(
              (args as any).include,
              model,
            ));
          (args as any).select &&
            ((args as any).select = selectSoftDelete(
              (args as any).select,
              model,
            ));

          return query(args);
        },

        async findUnique({ model, operation, args, query }) {
          const target = Prisma.dmmf.datamodel.models.find(
            (m) => m.name === model,
          );

          if (target?.fields.find((m) => m.name === 'deletedAt')) {
            (args as any).where = { ...args.where, deletedAt: null };
          }

          (args as any).where &&
            ((args as any).where = whereSoftDelete((args as any).where, model));
          (args as any).include &&
            ((args as any).include = includeSoftDelete(
              (args as any).include,
              model,
            ));
          (args as any).select &&
            ((args as any).select = selectSoftDelete(
              (args as any).select,
              model,
            ));

          return query(args);
        },

        async findFirstOrThrow({ model, operation, args, query }) {
          const target = Prisma.dmmf.datamodel.models.find(
            (m) => m.name === model,
          );

          if (target?.fields.find((m) => m.name === 'deletedAt')) {
            (args as any).where = { ...args.where, deletedAt: null };
          }

          (args as any).where &&
            ((args as any).where = whereSoftDelete((args as any).where, model));
          (args as any).include &&
            ((args as any).include = includeSoftDelete(
              (args as any).include,
              model,
            ));
          (args as any).select &&
            ((args as any).select = selectSoftDelete(
              (args as any).select,
              model,
            ));

          return query(args);
        },

        async findUniqueOrThrow({ model, operation, args, query }) {
          const target = Prisma.dmmf.datamodel.models.find(
            (m) => m.name === model,
          );

          if (target?.fields.find((m) => m.name === 'deletedAt')) {
            (args as any).where = { ...args.where, deletedAt: null };
          }

          (args as any).where &&
            ((args as any).where = whereSoftDelete((args as any).where, model));
          (args as any).include &&
            ((args as any).include = includeSoftDelete(
              (args as any).include,
              model,
            ));
          (args as any).select &&
            ((args as any).select = selectSoftDelete(
              (args as any).select,
              model,
            ));

          return query(args);
        },

        async count({ model, operation, args, query }) {
          const target = Prisma.dmmf.datamodel.models.find(
            (m) => m.name === model,
          );

          if (target?.fields.find((m) => m.name === 'deletedAt')) {
            (args as any).where = { ...args.where, deletedAt: null };
          }

          (args as any).where &&
            ((args as any).where = whereSoftDelete((args as any).where, model));
          (args as any).include &&
            ((args as any).include = includeSoftDelete(
              (args as any).include,
              model,
            ));
          (args as any).select &&
            ((args as any).select = selectSoftDelete(
              (args as any).select,
              model,
            ));

          return query(args);
        },

        async update({ model, operation, args, query }) {
          const target = Prisma.dmmf.datamodel.models.find(
            (m) => m.name === model,
          );

          return query(args);
        },
      },
    },
    model: {
      $allModels: {
        /** SoftDelete
         * 테이블 내 deletedAt 컬럼에 현재 날짜를 기록하여 삭제된 데이터로 취급합니다.
         *  */
        async softDelete<M, A>(
          this: M,
          where: Prisma.Args<M, 'update'>['where'],
        ): Promise<Prisma.Result<M, A, 'update'>> {
          const context = Prisma.getExtensionContext(this);

          await cascade.onDelete(
            context.name as Prisma.ModelName,
            Object.values(where)[0],
          );

          return (context as any).update({
            where,
            data: {
              deletedAt: new Date(),
            },
          });
        },
        async softDeleteMany<M, A>(
          this: M,
          where: Prisma.Args<M, 'updateMany'>['where'],
        ): Promise<Prisma.Result<M, A, 'update'>> {
          const context = Prisma.getExtensionContext(this);

          return (context as any).updateMany({
            where,
            data: {
              deletedAt: new Date(),
            },
          });
        },
      },
    },
  });

const cascade = {
  onDelete: async (model: Prisma.ModelName, id: any) => {
    //요청 모델의 정보
    const target = Prisma.dmmf.datamodel.models.find((m) => m.name === model);

    //요청 모델의 Many관계 필터
    const targetMany =
      target?.fields.filter((m) => m.kind === 'object' && m.isList) || [];

    for (const many of targetMany) {
      //요청 모델의 Many관계 모델 정보
      const includeModel = Prisma.dmmf.datamodel.models.find(
        (m) => m.name === many.type,
      );
      const includeModelPrimaryKey = includeModel?.fields.find((m) => m.isId);
      const relationFromFields =
        includeModel?.fields.find((m) => m.type === target?.name)
          ?.relationFromFields || [];

      if (includeModel?.fields.some((m) => m.name === relationFromFields[0])) {
        const findRelationFromFields = await prisma[
          many?.type.charAt(0) + many?.type.slice(1)
        ].findMany({ where: { [relationFromFields[0]]: id } });

        if (includeModel?.fields.find((m) => m.name === 'deletedAt')) {
          for (const relationFromField of relationFromFields) {
            await prisma[many?.type.charAt(0) + many?.type.slice(1)].updateMany(
              {
                where: { [relationFromField]: id },
                data: { deletedAt: new Date() },
              },
            );
          }
        }

        if (findRelationFromFields.length !== 0) {
          for (const findRelationTarget of findRelationFromFields) {
            await cascade.onDelete(
              includeModel?.name as Prisma.ModelName,
              findRelationTarget[includeModelPrimaryKey?.name],
            );
          }
        }
      }
    }
  },
};

function whereSoftDelete(obj: object, model: Prisma.ModelName) {
  const target = Prisma.dmmf.datamodel.models.find((m) => m.name === model);
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      const includeModelInfo = target?.fields.find((m) => m.name === key);
      if (includeModelInfo) {
        whereSoftDelete(obj[key], includeModelInfo?.type as Prisma.ModelName);
      }
    }

    const includeTarget = Prisma.dmmf.datamodel.models.find(
      (m) => m.name === target?.fields.find((m) => m.name === key)?.type,
    );

    /** 조인 모델 */
    if (
      target?.fields.find((m) => m.name === key)?.kind === 'object' &&
      includeTarget?.fields.some((m) => m.name === 'deletedAt')
    ) {
      const includeWhereTarget = target.fields.find(
        (m) => m.name === key,
      )?.type;
      const includeWhereIsList = target.fields.find(
        (m) => m.name === key,
      )?.isList;
      const includeWhereModel = Prisma.dmmf.datamodel.models.find(
        (m) => m.name === includeWhereTarget,
      );

      if (!includeWhereIsList) {
        if (includeWhereModel?.fields.some((m) => m.name === 'deletedAt')) {
          if (Object.keys(obj[key]).includes('is')) {
            obj[key].is = { ...obj[key].is, deletedAt: null };
          }

          if (Object.keys(obj[key]).includes('isNot')) {
            obj[key].isNot = { ...obj[key].isNot, deletedAt: null };
          }

          if (
            !Object.keys(obj[key]).includes('isNot') &&
            !Object.keys(obj[key]).includes('is')
          ) {
            obj[key] = { ...obj[key], deletedAt: null };
          }
        }
      } else {
        if (Object.keys(obj[key]).includes('some')) {
          obj[key].some = { ...obj[key].some, deletedAt: null };
        }

        if (Object.keys(obj[key]).includes('every')) {
          obj[key].every = { ...obj[key].every, deletedAt: null };
        }

        if (Object.keys(obj[key]).includes('none')) {
          obj[key].none = { ...obj[key].none, deletedAt: null };
        }
      }
    }
  }
  return obj;
}

function includeSoftDelete(obj: object, model: Prisma.ModelName) {
  const target = Prisma.dmmf.datamodel.models.find((m) => m.name === model);
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      const includeModelInfo = target?.fields.find((m) => m.name === key);
      includeSoftDelete(
        obj[key],
        includeModelInfo ? (includeModelInfo?.type as Prisma.ModelName) : model,
      );
    }

    const includeTarget = Prisma.dmmf.datamodel.models.find(
      (m) => m.name === target?.fields.find((m) => m.name === key)?.type,
    );

    /** 조인 모델 */
    if (
      target?.fields.find((m) => m.name === key)?.kind === 'object' &&
      includeTarget?.fields.some((m) => m.name === 'deletedAt')
    ) {
      const includeWhereTarget = target.fields.find(
        (m) => m.name === key,
      )?.type;
      const includeWhereIsList = target.fields.find(
        (m) => m.name === key,
      )?.isList;
      const includeWhereIsRequired = target.fields.find(
        (m) => m.name === key,
      )?.isRequired;
      const includeWhereModel = Prisma.dmmf.datamodel.models.find(
        (m) => m.name === includeWhereTarget,
      );

      if (!(!includeWhereIsList && includeWhereIsRequired)) {
        if (!includeWhereIsList) {
          if (includeWhereModel?.fields.some((m) => m.name === 'deletedAt')) {
            if (obj[key] === true) {
              obj[key] = { where: { ...obj[key].where, deletedAt: null } };
            } else {
              obj[key]['where'] = { ...obj[key]['where'], deletedAt: null };
            }
          }
        } else {
          if (obj[key] === true) {
            obj[key] = { where: { ...obj[key].where, deletedAt: null } };
          } else {
            obj[key]['where'] = { ...obj[key]['where'], deletedAt: null };
          }
        }
      }
    }
  }
  return obj;
}

function selectSoftDelete(obj: object, model: Prisma.ModelName) {
  const target = Prisma.dmmf.datamodel.models.find((m) => m.name === model);
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      const includeModelInfo = target?.fields.find((m) => m.name === key);
      selectSoftDelete(
        obj[key],
        includeModelInfo ? (includeModelInfo?.type as Prisma.ModelName) : model,
      );
    }

    const includeTarget = Prisma.dmmf.datamodel.models.find(
      (m) => m.name === target?.fields.find((m) => m.name === key)?.type,
    );

    /** 조인 모델 */
    if (
      target?.fields.find((m) => m.name === key)?.kind === 'object' &&
      includeTarget?.fields.some((m) => m.name === 'deletedAt')
    ) {
      const includeWhereTarget = target.fields.find(
        (m) => m.name === key,
      )?.type;
      const includeWhereIsList = target.fields.find(
        (m) => m.name === key,
      )?.isList;
      const includeWhereIsRequired = target.fields.find(
        (m) => m.name === key,
      )?.isRequired;
      const includeWhereModel = Prisma.dmmf.datamodel.models.find(
        (m) => m.name === includeWhereTarget,
      );

      if (!(!includeWhereIsList && includeWhereIsRequired)) {
        if (!includeWhereIsList) {
          if (includeWhereModel?.fields.some((m) => m.name === 'deletedAt')) {
            if (obj[key] === true) {
              obj[key] = { where: { ...obj[key].where, deletedAt: null } };
            } else {
              obj[key]['where'] = { ...obj[key]['where'], deletedAt: null };
            }
          }
        } else {
          if (obj[key] === true) {
            obj[key] = { where: { ...obj[key].where, deletedAt: null } };
          } else {
            obj[key]['where'] = { ...obj[key]['where'], deletedAt: null };
          }
        }
      }
    }
  }
  return obj;
}

//
function OldincludeSoftDelete(obj: object, model: Prisma.ModelName) {
  const target = Prisma.dmmf.datamodel.models.find((m) => m.name === model);

  for (const key in obj) {
    if (obj[key] instanceof Object) {
      const includeModelInfo = target?.fields.find((m) => m.name === key);
      includeSoftDelete(obj[key], includeModelInfo?.type as Prisma.ModelName);
    }

    const includeModelTarget = target?.fields.find((m) => m.name === key)?.type;
    const includeModel = Prisma.dmmf.datamodel.models.find(
      (m) => m.name === includeModelTarget,
    );

    if (includeModel?.fields.some((m) => m.name === 'deletedAt')) {
      /** 기본 include 값이 모델에 대한 허용만 설정한 경우 */
      if (obj[key] === true) {
        obj[key] = { where: { ...obj[key].where, deletedAt: null } };
      }

      /** include 옵션을 추가 포함하는 경우 */
      if (Object.keys(obj[key]).includes('include')) {
        obj[key] = {
          where: { ...obj[key].where, deletedAt: null },
          ...obj[key],
        };
      }

      /** SELECT 옵션을 포함하는 경우 */
      if (Object.keys(obj[key]).includes('select')) {
        obj[key] = {
          where: { ...obj[key].where, deletedAt: null },
          ...obj[key],
        };
      }
    }
  }
  return obj;
}
