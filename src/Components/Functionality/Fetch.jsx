// // /* eslint-disable no-console */
// // const myHeaders = new Headers();
// // myHeaders.append('apikey', '4OEJUFR5ajT21SP1pafXFqmgndEr9kPT');

// // const requestOptions = {
// //   method: 'GET',
// //   redirect: 'follow',
// //   headers: myHeaders,
// // };
// // const ShowCurrency = async () => {
// //   await fetch('https://api.apilayer.com/fixer/symbols', requestOptions)
// //     .then((response) => response.json())
// //     .then((response) => response.symbols)
// //     .then((result) => console.table(result));
// //   // .catch((error) => console.log('error', error));
// // };

// // const ConvertCurrency = async ({ to, from, amount }) => {
// //   await fetch(
// //     `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
// //     requestOptions
// //   ).then((response) => response.json());
// //   // .then((result) => console.log(result));
// //   // .catch((error) => console.log('error', error));
// // };

// // export { ShowCurrency, ConvertCurrency };
// const Fetch = () => {
//   const options = { method: 'GET', headers: { accept: 'application/json' } };

//   fetch(
//     'https://api.fastforex.io/currencies?api_key=93aa5febd2-54056c84ae-rpt7be',
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       return response.currencies;
//     });
// };

// export default Fetch;
