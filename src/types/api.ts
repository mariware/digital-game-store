import { PayloadAction } from "@reduxjs/toolkit";

// generic reusable response schema
export type ResponseSchema<T> = {
  results: T[];
  data?: T[];
};

// generic action type
export type ActionT<T> = PayloadAction<T[]>;

// query parameters for RAWG API
export type GetGameListTypes = {
  page?: number;
  page_size?: number;
  search?: string;
  search_precise?: boolean;
  dates?: string;
  ordering?: string;
  parent_platforms?: number;
  genres?: string;
};
