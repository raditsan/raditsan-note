import { writable } from 'svelte/store';

// Define the Fetcher options and response types
type FetcherOptions = {
	url?: string | null | undefined;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: object | null;
	headers?: Record<string, string> | null;
};

export type FetchResult = Response | null | undefined;

export type FetcherResponse<T> = {
	data: T | null;
	errorMessage: string | null;
	isLoading: boolean;
};
const defaultState = {
	data: null,
	errorMessage: null,
	isLoading: false,
}
// Fetcher class with a reactive store to trigger Svelte updates
export class Fetcher<T = never> {
	private url: string | null | undefined;
	private method: 'GET' | 'POST' | 'PUT' | 'DELETE' | null | undefined;
	private body: object | null | undefined;
	private headers: Record<string, string> | null | undefined;
	
	// Use a writable store to manage the state reactively
	public store = writable<FetcherResponse<T>>(defaultState);

	constructor({ url = null, method = 'GET', body = null, headers = null }: FetcherOptions) {
		this.url = url;
		this.method = method;
		this.body = body;
		this.headers = headers;
	}
	
	public resetState() {
		this.store.update(() => (defaultState));
	}

	// Method to perform the fetch request
	public async fetch(props?: FetcherOptions | null): Promise<FetchResult> {
		let resultResponse: Response
		if (props) {
			const { url, method, body = null, headers = null } = props
			this.url = url || this.url;
			this.method = method || this.method;
			this.body = body || this.body;
			this.headers = headers || this.headers;
		}
		
		// Update the store to set isLoading to true
		this.store.update((state) => ({ ...state, isLoading: true, errorMessage: null }));

		try {
			const defaultHeaders = {
				'Content-Type': 'application/json',
				...this.headers,
			};

			const response = await fetch(this.url ?? '', {
				method: this.method as never,
				headers: defaultHeaders as never,
				body: this.body ? JSON.stringify(this.body) as never : undefined,
			});
			resultResponse = response.clone();
			
			if (!response.ok) {
				const errorText = await response.text();
				this.store.update((state) => ({
					...state,
					errorMessage: `Error: ${response.status} ${response.statusText} - ${errorText}`,
					isLoading: false,
				}));
			} else {
				const data = await response.json();
				this.store.update((state) => ({ ...state, data, isLoading: false }));
			}
			
			return Promise.resolve(resultResponse)
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			this.store.update((state) => ({
				...state,
				errorMessage,
				isLoading: false,
			}));
		}
	}
}