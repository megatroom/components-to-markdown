export interface DocDataEntity {
  name: string;
  hasSoftBreak?: boolean;
  content?: string;
}

export interface DocDataBlockTag {
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

export interface DocDataSectionTag {
  since?: string;
}

export interface DocDataSection {
  description: string;
  tags: DocDataSectionTag;
}

export interface DocDataParam {
  name: string;
  description?: string;
}

export interface DocData extends Required<DocDataModifier>, DocDataSectionTag {
  description: string;
  hasModifiers: boolean;
  deprecated?: DocDataBlockTag;
  remarks?: DocDataBlockTag;
  returns?: DocDataBlockTag;
  defaultValue?: DocDataBlockTag;
  examples?: DocDataBlockTag[];
  params: DocDataParam[];
}
