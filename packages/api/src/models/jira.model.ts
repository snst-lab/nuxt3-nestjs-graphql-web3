export type FetchBoadsResponse = {
  values: Array<Boad>;
};

export type Boad = {
  id: string;
  location: { projectid: number; displayName: string; name: string };
};

export class SomeClass {}
