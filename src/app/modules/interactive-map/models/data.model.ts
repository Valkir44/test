export interface Parent {
  id: number;
  name: string;
  children: Child[];
}

export interface Child {
  name: string;
  parent_id: number;
}
