export interface DocDataTag {
  name: string;
  description?: string;
}

export interface DocDataParam {
  name: string;
  description?: string;
}

export interface DocData {
  description: string;
  tags: DocDataTag[];
  modifiers: DocDataTag[];
  params: DocDataParam[];
}
