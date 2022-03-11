import { C } from "./Constants";
import { Api, IApiProps } from "./Api";
import { Message } from "./Message";
import { Notification } from "./Notification";

const CLS = {
  [C.ORM_MESSAGES]: Message,
  [C.ORM_NOTIFICATIONS]: Notification,
};

export class Collection extends Api {
  constructor(dbTable: IApiProps["ORM"]) {
    super();
    this.ORM = dbTable;
    this.constructor = CLS[dbTable];
  }

  then<T>(func: ([]) => T[]) {
    return new Promise<T[]>((resolve, reject) => {
      this.fetch({
        endpoint: C.API_ENDPOINT_GET_ALL + this.parseQuery({ table: this.ORM }),
        method: "GET",
      })
        .then((dtoList) => this.deserializeArray<T>(dtoList))
        .then((list) => resolve(func(list)))
        .catch((error) => reject(error));
    });
  }
}
