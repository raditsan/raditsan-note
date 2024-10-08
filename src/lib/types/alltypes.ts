export interface ApiResponse<T> {
	success: boolean;
	data: T
	error: string | null
}
export interface Note {
	id: string;
	name: string;
	content: string;
	lang: string;
	category_name: string;
	created_date?: string;
	updated_date?: string;
	is_deleted?: boolean;
	version?: number;
	
	isShowDetail?: boolean;
}