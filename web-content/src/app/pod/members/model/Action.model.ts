
export interface Action<T> {
    type: string,
    payload: T,
    error: boolean,
    meta: Meta

}

export interface Meta {

}