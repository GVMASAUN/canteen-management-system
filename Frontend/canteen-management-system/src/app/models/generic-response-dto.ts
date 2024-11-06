export interface GenericResponseDTO<T> {
    statusCode: number;
    error: String;
    message: String;
    data: T;
}
