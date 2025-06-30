import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const logDir = "logs";

const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "app-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "info"
});

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    dailyRotateFileTransport,
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error"
    }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(logDir, "exceptions.log") })
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join(logDir, "rejections.log") })
  ]
});

export default logger;
