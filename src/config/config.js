import CryptoJS from "crypto-js";
// 配置属性
export const config = {
  /*加密*/
  aesEncrypt: function(encrypt) {
    var aesPrivateKey = "abcdefgabcdefg12"; //密钥
    var key = CryptoJS.enc.Utf8.parse(aesPrivateKey);
    var srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(encrypt));
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  /*解密*/
  aesDecrypt: function(decryptString) {
    var aesPrivateKey = "abcdefgabcdefg12"; //密钥
    var key = CryptoJS.enc.Utf8.parse(aesPrivateKey);
    var decrypt = CryptoJS.AES.decrypt(decryptString, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },

  // 优必飞加密
  Encrypt: function(word, keyStr, ivStr) {
    const KEY = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
    const IV = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
    let key = KEY;
    let iv = IV;
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
    let srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },
};
