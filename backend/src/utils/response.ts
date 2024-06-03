import { Response } from "express";

export function sendResponse(
  statusCode: number,
  message: string,
  data: any[],
  res: Response
) {
  return res.json({
    statusCode: statusCode,
    message: message,
    data: data,
  });
}
