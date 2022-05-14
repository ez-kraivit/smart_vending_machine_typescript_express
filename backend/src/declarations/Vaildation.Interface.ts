export default interface IValidation {
    query?: { [I: string]: string | number | boolean | undefined | null | Object | Array<Object> | Date | Buffer | any };
    body?: { [I: string]: string | number | boolean | undefined | null | Object | Array<Object> | Date | Buffer | any };
    parame?: { [I: string]: string | number | boolean | undefined | null | Object | Array<Object> | Date | Buffer | any };
}