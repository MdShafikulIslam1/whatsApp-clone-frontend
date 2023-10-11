export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ISuccessResponse = {
  data: any;
  meta?: IMeta;
};
export type IGenericErrorMessages = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessages[];
};
