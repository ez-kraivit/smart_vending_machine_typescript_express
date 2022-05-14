import * as crypto from 'crypto'
export default class Encrypt {

    static encrypt(text, key='apPaTDUkGVRxHyyh2dBB2KI82q/K4KiQP+79SkUzB/o=') {
        const encryptSecretKey = Buffer.from(key, 'base64')
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-ctr',Buffer.from(encryptSecretKey, 'hex'), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex')
    }

    static decrypt(text, key='apPaTDUkGVRxHyyh2dBB2KI82q/K4KiQP+79SkUzB/o=') {
        const encryptSecretKey = Buffer.from(key, 'base64')
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv("aes-256-ctr", Buffer.from(encryptSecretKey, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    static async decryptData (data, keys='apPaTDUkGVRxHyyh2dBB2KI82q/K4KiQP+79SkUzB/o='){
        switch (true) {
            case !Array.isArray(data) && typeof data === 'object':
                keys.map((key)=>{ return data[key] = Encrypt.decrypt(data[key],jsonSecrtKey) })
                return data
            case Array.isArray(data) :
                return await Promise.all(data.map(async(item)=> {
                    Object.keys(item).map(async(key) => {
                        if(keys.indexOf(key)>-1) item[key] =  Encrypt.decrypt(item[key],jsonSecrtKey)
                        return key
                    })
                    return item
                }))
            default:
                return {}
        }
    }

}
