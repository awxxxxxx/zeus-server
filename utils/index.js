'use strict';

/**
 * md5 加密函数
 * @param  {String} text 要加密的文本
 * @return {String}      加密后的文本
 */
function md5(text){
    return require('crypto').createHash('md5').update(text).digest('hex');
}

module.exports = {
  md5: md5
}
