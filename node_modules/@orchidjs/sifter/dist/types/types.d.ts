export declare type Field = {
    field: string;
    weight: number;
};
export declare type Sort = {
    field: string;
    direction?: string;
};
export declare type Options = {
    fields: Field[];
    sort: Sort[];
    score?: () => any;
    filter?: boolean;
    limit?: number;
    sort_empty?: Sort[];
    nesting?: boolean;
    respect_word_boundaries?: boolean;
    conjunction?: string;
};
export declare type Token = {
    string: string;
    regex: RegExp | null;
    field: string | null;
};
export declare type Weights = {
    [key: string]: number;
};
export declare type PrepareObj = {
    options: Options;
    query: string;
    tokens: Token[];
    total: number;
    items: ResultItem[];
    weights: Weights;
    getAttrFn: (data: any, field: string) => any;
};
export declare type Settings = {
    diacritics: boolean;
};
export declare type ResultItem = {
    score: number;
    id: number | string;
};
