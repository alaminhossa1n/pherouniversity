import { Types } from "mongoose";

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: Array<{
    name: string;
    isDeleted: boolean;
  }>;
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number; //calculate from start and end
  details: {
    level: string;
    description: string;
  };
  createdBy: Types.ObjectId;
};

export type TPagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

export type TQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  startDate?: string;
  endDate?: string;
  language?: string;
  provider?: string;
  durationInWeeks?: number;
  level?: string;
};
