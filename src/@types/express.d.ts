/* eslint-disable @typescript-eslint/interface-name-prefix */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
declare namespace Express {
  export interface Request {
    cooperator: {
      cooperator_id: string;
    };
  }
}