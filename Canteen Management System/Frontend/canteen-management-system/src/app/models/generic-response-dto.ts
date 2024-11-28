export interface IGenericResponse<T> {
    statusCode: number;
    error: String;
    message: String;
    data: T;
}
