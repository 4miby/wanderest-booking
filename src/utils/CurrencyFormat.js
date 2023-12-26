 // Hàm format tiền
export const currencyFormat=(money)=> {
  return money.toLocaleString('vi-VN', { style: 'decimal' }).replace(/,/g, '.');
}
