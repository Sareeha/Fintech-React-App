// const stockAPI = {
//   method: 'GET',
//   url: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=ND8F92JJJJEUYSOY',
//   params: {
//     function: 'TIME_SERIES_MONTHLY',
//     symbol: 'IBM',
//     datatype: 'json',
//   },
// };
// export default stockAPI;

// secondary key
const stockAPI = {
  method: 'GET',
  url: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=0718d4eb4fmsh722b9eaacfb2289p13cf81jsn2334d8c3b964',
  params: {
    function: 'TIME_SERIES_MONTHLY',
    symbol: 'IBM',
    datatype: 'json',
  },
};
export default stockAPI;

//third attempt
// const stockAPI = {
//   method: 'GET',
//   url: 'https://alpha-vantage.p.rapidapi.com/query',
//   params: {
//     symbol: 'IBM',
//     function: 'TIME_SERIES_MONTHLY',
//     datatype: 'json'
//   },
//   headers: {
//     'X-RapidAPI-Key': '0718d4eb4fmsh722b9eaacfb2289p13cf81jsn2334d8c3b964',
//     'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
//   }
// };

