import { C } from "./Constants";
import { Manage } from "./Manage";
import { Lot } from "./Lot";

interface IRequestProps {
  uid: string;
  start: string;
  end: string;
  lotUID: string;
  paymentUID: string;
  spotType: C.SPOT_TYPE_STANDARD;
  state:
    | C.REQUEST_PENDING
    | C.REQUEST_ACCEPTED
    | C.REQUEST_REJECTED
    | C.REQUEST_USED
    | C.REQUEST_EXPIRED;
}

export class Request extends Manage {
  private start: IRequestProps["start"];
  private end: IRequestProps["end"];
  private state: IRequestProps["state"];
  private spotType: IRequestProps["spotType"];
  private lotUID: IRequestProps["lotUID"];
  private paymentUID: IRequestProps["paymentUID"];

  constructor({
    lotUID,
    paymentUID,
    start,
    end,
    spotType,
    uid,
  }: Partial<IRequestProps> = {}) {
    super(uid);
    this.lotUID = lotUID;
    this.paymentUID = paymentUID;
    this.state = C.REQUEST_PENDING;
    this.spotType = spotType || C.SPOT_TYPE_STANDARD;
    this.ORM = C.ORM_REQUESTS;
    this.start = new Date(start).toString();
    this.end = new Date(end).toString();
  }

  modify({ state }: Partial<IRequestProps> = {}) {
    this.state = state || this.state;
    return this.put<Request>({ uid: this.uid });
  }

  send() {
    return this.post<Request>();
  }

  cost() {
    return (
      (new Date(this.end).getTime() - new Date(this.start).getTime()) *
      C.COST_BY_MILLISECONDS
    );
  }

  checkIn() {
    this.state = C.REQUEST_USED;
    return new Promise((resolve, reject) => {
      this.modify()
        .then((request) => {
          new Lot()
            .get<Lot>({ uid: request.lotUID })
            .then((lot) => resolve(lot.occupyRandomSpot()));
        })
        .catch((error) => reject(error));
    });
  }
}
