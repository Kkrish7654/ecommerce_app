import { Response } from "express";

export function sendResponse(
  statusCode: number,
  message: string,
  data: any,
  res: Response
) {
  res.status(statusCode);
  return res.json({
    statusCode: statusCode,
    message: message,
    data: data,
  });
}
