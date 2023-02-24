const { createLogger, format, transports } = require("winston");

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      filename: "logs/debug.log",
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      filename: "logs/warn.log",
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
