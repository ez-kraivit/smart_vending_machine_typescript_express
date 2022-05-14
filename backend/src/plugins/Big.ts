import Big from 'big.js'
export type SubType = string | boolean | number | bigint | symbol | null | undefined | object | Function | Date | RegExp | Array<any> | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>;
export default class Bigjs {

    calculator(variable1:number,operator:string,variable2:number):Big{
        switch (operator) {
            case "%":
                return new Big(variable1).mod(variable2)
                break;
            case "*":
                return new Big(variable1).times(variable2)
                break;
            case "/":
                return new Big(variable1).div(variable2)
                break;
            case "+":
                return new Big(variable1).plus(variable2)
                break;
            case "-":
                return new Big(variable1).minus(variable2)
                break;
            default:
                return new Big(0)
                break;
        }
    }
}