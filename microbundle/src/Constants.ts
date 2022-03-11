export enum C {
  MESSAGE_STATE_DELIVERED = "delivered",
  MESSAGE_STATE_READ = "read",

  NOTIFICATION_STATE_DISPATCHED = "dispatched",
  NOTIFICATION_STATE_RECEIVED = "received",

  ORM_LOTS = "LOTS",
  ORM_ADMINS = "ADMINS",
  ORM_DRIVERS = "DRIVERS",
  ORM_MESSAGES = "MESSAGES",
  ORM_REQUESTS = "REQUESTS",
  ORM_PAYMENTS = "PAYMENTS",
  ORM_NOTIFICATIONS = "NOTIFICATIONS",

  DB_FILE_PATH = "./public/db/index.json",

  API_ENDPOINT_GET_ALL = "/api/v1/get_all?",
  API_ENDPOINT_GET = "/api/v1/get?",
  API_ENDPOINT_PUT = "/api/v1/put?",
  API_ENDPOINT_POST = "/api/v1/post?",
  API_ENDPOINT_DELETE = "/api/v1/delete?",
}
