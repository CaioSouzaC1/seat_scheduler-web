export interface IApiRoot {
  error: boolean;
  data: any;
  message: string;
}
export interface IPaginate {
  meta: {
    total: number;
    perPage: number;
    currentPage: any;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: any;
    previousPageUrl: any;
  };
  data: any;
}

export interface IPaginateRoot extends IApiRoot {
  data: IPaginate;
}

export interface ITimestamps {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IQueryPaginateRoot {
  page?: number;
  limit?: number;
  search?: string;
  status?: "available" | "scheduled" | "busy";
}