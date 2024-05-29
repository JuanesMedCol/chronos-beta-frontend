export interface ResponseDTO extends ResponseDTOBase{
    payload: Object[],
}

export interface ResponseDTOBase {
    errors? : Object[],
    success: boolean,
    message?: string, 
}
