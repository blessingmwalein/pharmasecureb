//create export files to encrypt and decrypt data
//create a service to encrypt and decrypt data
// import { createCipheriv, randomBytes, scrypt } from 'crypto';
// import { createDecipheriv } from 'crypto';
import * as crypto from 'crypto-js';


export  function encrypt(data: any) {
  var words = crypto.enc.Utf8.parse(data);
  var encoded = crypto.enc.Base64.stringify(words);
  return encoded;
}

export function decrypt(data: any) {

    var data = data.toString();
    var words = crypto.enc.Base64.parse(data);
    return words.toString(crypto.enc.Utf8);
}
