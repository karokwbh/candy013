// 編號：CANDY-013
// 程式語言：JavaScript
// 題目：根據台灣財政部所提供的公司統編驗證規則，計算統一編號是否正確
// https://www.fia.gov.tw/singlehtml/3?cntId=c4d9cff38c8642ef8872774ee9987283

function isValidVatNumber(vat) {
    // 把字串轉成數字陣列
    vat = Array.from(vat).map(d => Number(d));
    if (vat.length != 8) {
        return false;
    }

    const logicalMultiplier = [1, 2, 1, 2, 1, 2, 4, 1];
    const divisor = 5;
    const total = vat.reduce((acc, cur, idx) => {
        // 對每個數字陣列乘上相對應的邏輯乘積
        const product = cur * logicalMultiplier[idx];
        if (!(idx === 6 && product === 28)) {
            return acc + Math.floor(product / 10) + (product % 10);
        }

        // 倒數第二為7時 回傳acc + 1 因為乘積之合 10 => 1
        return acc + 1;
    }, 0);

    // 倒數第二為7時 需多判斷0的情況 所以條件多加上(total - 1) % divisor === 0
    return ((vat[6] !== 7) && total % divisor === 0) || ((vat[6] === 7) && (total % divisor === 1 || (total - 1) % divisor === 0));
}

console.log(isValidVatNumber("10458575")) // true
console.log(isValidVatNumber("88117125")) // true
console.log(isValidVatNumber("53212539")) // true
console.log(isValidVatNumber("88117126")) // false