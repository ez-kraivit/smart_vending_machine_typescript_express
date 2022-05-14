import IValidation from "./Vaildation.Interface"

export default interface IOptions {
    name?:string;
    validate?:IValidation;
}