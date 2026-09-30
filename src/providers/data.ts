import {BaseRecord, DataProvider, GetListParams} from "@refinedev/core";
import {MOCK_SUBJECTS} from "@/constants/mock-data.ts";

export const dataProvider: DataProvider = {
  // getList: async <TData extends BaseRecord = BaseRecord>({resource}: GetListParams): Promise<GetListResponse<TData>> => {
  //   if(resource !== 'subjects') return {data: [] as TData[], total:0};
  //   return {
  //     data: MOCK_SUBJECTS as unknown as TData[],
  //     total: MOCK_SUBJECTS.length
  //   }
  // },
  /**
   * Returns all mock subjects, or an empty list for other resources.
   * Filtering, sorting, and pagination options are ignored by this mock provider.
   * @param params - The list request, from which only the resource name is used.
   * @returns The resource records and their total count.
   */
  getList: async <TData extends BaseRecord = BaseRecord>({resource}: GetListParams) => {
    if(resource !== 'subjects') return {data: [], total:0};
    return {
      data: MOCK_SUBJECTS as unknown as TData[],
      total: MOCK_SUBJECTS.length
    }
  },

  /** Rejects because fetching a single record is unsupported by this mock provider. */
  getOne: async () => {throw new Error("This function is not present in mock")},
  /** Rejects because creating records is unsupported by this mock provider. */
  create: async () => {throw new Error("This function is not present in mock")},
  /** Rejects because updating records is unsupported by this mock provider. */
  update: async () => {throw new Error("This function is not present in mock")},
  /** Rejects because deleting records is unsupported by this mock provider. */
  deleteOne: async () => {throw new Error("This function is not present in mock")},

  /** Returns an empty URL because this provider uses local mock data. */
  getApiUrl: () => ''
}
