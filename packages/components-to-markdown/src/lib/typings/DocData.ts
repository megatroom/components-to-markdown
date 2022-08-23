export interface DocDataEntity {
  name: string;
  hasSoftBreak?: boolean;
  description?: string;
  content?: string;
}

export interface DocDataBlockTag {
  description?: string;
  content?: string;
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
  hasModifiers: boolean;
  deprecated?: DocDataBlockTag;
  remarks?: DocDataBlockTag;
  returns?: DocDataBlockTag;
  defaultValue?: DocDataBlockTag;
  examples?: DocDataBlockTag[];
  params: DocDataParam[];
}
