import { PipelineStage, Types } from 'mongoose';

export const getProductsWithFiltersPipeline = (
  category: string | string[] | undefined,
  filters: Record<string, string | string[]>,
  page: number,
  limit: number
): PipelineStage[] => {
  const matchStage: PipelineStage.Match = { $match: {} };

  // Ensure filters is a valid object
  const filterObject =
    typeof filters === 'object' && !Array.isArray(filters) ? filters : {};

  // ✅ Handle `id` conversion separately (maps to `_id` in DB)
  if (filters.id) {
    const idArray = Array.isArray(filters.id) ? filters.id : [filters.id];
    matchStage.$match._id = {
      $in: idArray
        .map((id) =>
          Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null
        )
        .filter(Boolean), // Remove invalid IDs
    };
    delete filterObject.id; // Remove `id` from other filters
  }

  // ✅ Handle `category` filtering (case-insensitive exact match)
  if (category) {
    const categoryArray = Array.isArray(category) ? category : [category];
    matchStage.$match.category = {
      $in: categoryArray.map((cat) => new RegExp(`^${cat}$`, 'i')),
    };
  }

  // ✅ Handle other filters dynamically
  const escapeRegex = (str: string) =>
    str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape special regex characters

  const normalizeToLooseRegex = (value: string) => {
    const parts = value
      .trim()
      .split('-')
      .map(
        (p) => escapeRegex(p.toLowerCase()) // Escape individual parts
      );
    const pattern = parts.join('[\\s-]*'); // Allow spaces or hyphens between words
    return new RegExp(pattern, 'i'); // Case-insensitive regex
  };

  const filterConditions = Object.entries(filterObject)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return {
          [key]: {
            $in: value.map((v) => normalizeToLooseRegex(v)),
          },
        };
      } else if (typeof value === 'string' && value.trim() !== '') {
        return {
          [key]: {
            $regex: normalizeToLooseRegex(value),
          },
        };
      }
      return null;
    })
    .filter(Boolean) as Record<string, unknown>[];

  if (filterConditions.length > 0) {
    matchStage.$match = { ...matchStage.$match, $and: filterConditions };
  }
  const excludedFields = [
    '_id',
    'images',
    'createdAt',
    'updatedAt',
    'description',
    'thumbnail',
    'stock',
    'category',
  ]; // Add more if needed

  return [
    matchStage, // ✅ Match all products based on search filters
    {
      $facet: {
        products: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        filters: [
          {
            $project: {
              fields: { $objectToArray: '$$ROOT' },
            },
          },
          { $unwind: '$fields' },
          {
            $match: {
              'fields.k': { $nin: excludedFields },
            },
          },
          {
            $project: {
              k: '$fields.k',
              v: {
                $map: {
                  input: {
                    $cond: {
                      if: { $isArray: '$fields.v' },
                      then: '$fields.v',
                      else: ['$fields.v'],
                    },
                  },
                  as: 'item',
                  in: {
                    $cond: {
                      if: { $eq: [{ $type: '$$item' }, 'string'] },
                      then: {
                        $replaceAll: {
                          input: '$$item',
                          find: '-',
                          replacement: ' ',
                        },
                      },
                      else: '$$item',
                    },
                  },
                },
              },
            },
          },
          {
            $group: {
              _id: '$k',
              values: { $push: '$v' },
            },
          },
          {
            $project: {
              _id: 0,
              k: '$_id',
              v: {
                $reduce: {
                  input: '$values',
                  initialValue: [],
                  in: { $setUnion: ['$$value', '$$this'] },
                },
              },
            },
          },
          {
            $project: {
              k: 1,
              v: { $sortArray: { input: '$v', sortBy: 1 } },
            },
          },
          { $sort: { k: 1 } },
          {
            $group: {
              _id: null,
              dynamicFilters: { $push: { k: '$k', v: '$v' } },
            },
          },
          {
            $project: {
              dynamicFilters: { $arrayToObject: '$dynamicFilters' },
            },
          },
        ],
        totalCount: [{ $count: 'count' }],
      },
    },
    {
      $project: {
        products: 1,
        filters: {
          $ifNull: [{ $arrayElemAt: ['$filters.dynamicFilters', 0] }, {}],
        },
        totalCount: {
          $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0],
        },
      },
    },
  ];
};
