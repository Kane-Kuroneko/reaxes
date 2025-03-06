export type {}

export type FilterType = null|"active"|"starred"|"completed";
export type TodoItem = {
	id:number;
	content:string;
	important:boolean;
	checked:boolean;
};
