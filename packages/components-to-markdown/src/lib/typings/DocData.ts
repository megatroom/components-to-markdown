export interface DocDataEntity {
  name: string;
  description?: string;
}

export interface DocDataBlockTag {
  description?: string;
}

export interface DocDataModifier {
  beta?: boolean;
  alpha?: boolean;
  public?: boolean;
  internal?: boolean;
  virtual?: boolean;
  override?: boolean;
  sealed?: boolean;
}
export interface DocDataParam {
  name: string;
  description?: string;
}

export interface DocData extends Required<DocDataModifier> {
  description: string;
  deprecated?: DocDataBlockTag;
  remarks?: DocDataBlockTag;
  returns?: DocDataBlockTag;
  params: DocDataParam[];
}
