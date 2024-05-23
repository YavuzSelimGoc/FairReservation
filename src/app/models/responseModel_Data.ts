import { responseModel } from "./responseModel";

export interface ResponseModel_Data<T> extends responseModel{
    data:T;
}