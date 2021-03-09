// export class RoundValueConverter {
//   toView(value: number, decimals: number, method: 'round' | 'floor' | 'ceil' = 'round') {
//     if (decimals === 0) {
//       return Math[method](value);
//     }
//     if (decimals === 1) {
//       return Math[method](value * 10) / 10;
//     }
//     if (decimals === 2) {
//       return Math[method](value * 100) / 100;
//     }
//     if (decimals === 3) {
//       return Math[method](value * 1000) / 1000;
//     }
//     if (decimals === 4) {
//       return Math[method](value * 10000) / 10000;
//     }
//     return Math[method](value * 100000) / 100000;
//   }
// }
