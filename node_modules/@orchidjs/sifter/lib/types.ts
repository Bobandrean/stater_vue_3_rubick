
export type Field = {
	field: string,
	weight: number,
}

export type Sort = {
	field: string,
	direction?: string,
}

export type Options = {
 	fields: Field[],
 	sort: Sort[],
 	score?: ()=>any,
 	filter?: boolean,
 	limit?: number,
 	sort_empty?: Sort[],
 	nesting?: boolean,
	respect_word_boundaries?: boolean,
	conjunction?: string,
}

export type Token = {
	string:string,
	regex:RegExp|null,
	field:string|null,
}

export type Weights = {[key:string]:number}

export type PrepareObj = {
	options: Options,
	query: string,
	tokens: Token[],
	total: number,
	items: ResultItem[],
	weights: Weights,
	getAttrFn: (data:any,field:string)=>any,

}

export type Settings = {
	diacritics:boolean
}

export type ResultItem = {
	score: number,
	id: number|string,
}
