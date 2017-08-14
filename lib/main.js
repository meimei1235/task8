function addParity(num) {
    let str = num.toString();
    let index = str.indexOf('-');
    if (index > 0) {
        str = str.substring(0, index).contact(str.substring(index + 1)); //如果有‘-’，去掉
    }
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += (parseInt(str.charAt(i)));
    }
    let bit1 = parseInt(sum / 10);
    let parity;
    if (sum % 10 == 0) {
        parity = 0;
    } else {
        parity = (bit1 + 1) * 10 - sum;
    }
    str += parity.toString(); //加上校验位的邮编字符串
     return str;
}

//邮编变条码
function postToBar(num, postConvertTab) {
   let post_str = addParity(num);
   let barcode = '';
    for (let i = 0; i < post_str.length; i++) {
        let post_elem = parseInt(post_str.charAt(i));
        barcode += postConvertTab[post_elem] + '\t';
    }
    barcode = '|\t'+ barcode + '|'
return  barcode ;
}
//条码变邮编
function barToPost(str, postConvertTab) {
  // let postConvertTab = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
  //       ':||::', '|:::|', '|::|:', '|:|::'];
  let bar_arr = str.split("\t");
  let len = bar_arr.length;
  bar_arr = bar_arr.slice(1,len-1); //去掉条码前后的竖线
  let post_str = '';
  bar_arr.forEach(bar => {
      post_str += postConvertTab.indexOf(bar).toString();
  });
  post_str = post_str.substring(0, post_str.length - 1); // 去掉最后一位校验位
  if (post_str.length > 5) {
     post_str = post_str.substring(0, 5) + '-' + post_str.substring(5);
  }
  return post_str;
}

function main(param){
    let postConvertTab = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
        ':||::', '|:::|', '|::|:', '|:|::'];
    if (typeof param == 'number') {
        return postToBar(param, postConvertTab);
    }
    return barToPost(param, postConvertTab);
}
module.exports = main;
// let a = main(95713);
// console.log(a);
// let b = main('|\t:|:|:\t:|:|:\t:|:|:\t:|:|:\t:|:|:\t:::||\t::|:|\t::||:\t|:::|\t::|:|\t|');
// console.log(b);