import * as crypto from 'crypto'
export default class Encrypt {

    static encrypt(text: string, key: string): string {
        const encryptSecretKey:any = Buffer.from(key, 'base64')
        const iv: Buffer = crypto.randomBytes(16);
        const cipher: any = crypto.createCipheriv('aes-256-ctr',Buffer.from(encryptSecretKey, 'hex'), iv);
        let encrypted: Buffer = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);        
        return iv.toString('hex') + ':' + encrypted.toString('hex')
    }

    static decrypt(text: string, key: string): string {
        const encryptSecretKey: any = Buffer.from(key, 'base64')
        const textParts: any = text.split(':');
        const iv: Buffer = Buffer.from(textParts.shift(), 'hex');
        const encryptedText: Buffer = Buffer.from(textParts.join(':'), 'hex');
        const decipher: any = crypto.createDecipheriv("aes-256-ctr", Buffer.from(encryptSecretKey, 'hex'), iv);    
        let decrypted: Buffer = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);  
        return decrypted.toString();
    }

    static async decryptData (data:{[I:string]: any } , keys:String[],jsonSecrtI:string){            
        switch (true) {
            case !Array.isArray(data) && typeof data === 'object':                    
                keys.map((key:any)=>{ return data[key] = Encrypt.decrypt(data[key],jsonSecrtKey) })
                return data
            case Array.isArray(data) :                    
                return await Promise.all(data.map(async(item:{[I:string]:any}):Promise<Object>=> { 
                    Object.keys(item).map(async(I:string) => {
                        if(keys.indexOf(key)>-1) item[key] =  Encrypt.decrypt(item[key],jsonSecrtKey)
                        return key
                    })
                    return item  
                }))
            default:
                return {}
        }
    }

    static async encryptData (data:{[I:string]: any } , keys:String[],jsonSecrtI:string){            
        switch (true) {
            case !Array.isArray(data) && typeof data === 'object':                    
                keys.map((key:any)=>{ return data[key] = Encrypt.encrypt(data[key],jsonSecrtKey) })
                return data
            case Array.isArray(data) :                    
                return await Promise.all(data.map(async(item:{[I:string]:any}):Promise<Object>=> { 
                    Object.keys(item).map(async(I:string) => {
                        if(keys.indexOf(key)>-1) item[key] =  Encrypt.encrypt(item[key],jsonSecrtKey)
                        return key
                    })
                    return item  
                }))
            default:
                return {}
        }
    }

}