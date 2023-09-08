const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {helperFunctions,fetchData, lifiService, uniswapRouterService, sushiswapService ,openoceanEvmService,paraswapService,zeroXservice} = require('../services');
const { TokenTypes } = require('aptos');

const allQuotes = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['fromChain', 'toChain', 'fromToken', 'toToken', 'fromAmount', 'fromAddress' , 'decimalsTokenIn', 'decimalsTokenOut', 'excludeExchanges']);

    let excludeExchanges = [];
    if (filter.hasOwnProperty('excludeExchanges') && (filter['excludeExchanges'] != '')) {
        excludeExchanges = helperFunctions.stringToArray(filter['excludeExchanges']);
    }

    const data = await getData(filter['fromToken'], filter['toToken'], filter['fromAmount'], filter['fromAddress'], filter['decimalsTokenIn'], filter['decimalsTokenOut'], filter['fromChain'], filter['toChain'], excludeExchanges);

    res.send(data)
});

const getData = async (
    fromToken,
    toToken,
    fromAmount,
    fromAddress,
    decimalsTokenIn = 6,
    decimalsTokenOut = 6,
    fromChain = 1,
    toChain = 1,
    excludeExchanges = []
) => {
    let lifiRoute = {};
    let uniswapRout = {};
    let sushiswapRout = {};
    let openoceanEvmRout = {};
    let zeroXroute={};
    let paraswapRoute={}
    let inputToken={}
    let outputToken={}
    inputToken=fetchData(fromToken)
    outputToken=fetchData(toToken)
    if (!excludeExchanges.includes('lifi')) {
        lifiRoute = lifiService.lifiRouteHandler(fromChain, toChain, fromToken, toToken, fromAmount, fromAddress, decimalsTokenIn, decimalsTokenOut);
    } else {
        lifiRoute = { status: 500 ,data: { }}
    }

    if (!excludeExchanges.includes('uniswap')) {
        uniswapRout = uniswapRouterService.uniswapRouteHandler(fromToken, toToken, fromAmount, fromAddress, decimalsTokenIn, decimalsTokenOut,fromChain);
    } else {
        uniswapRout = { status: 500 ,data: { }}
    }
    if(!excludeExchanges.includes('sushiswap')){
        sushiswapRout =  sushiswapService.sushiswapRoutHandler(fromToken, toToken,fromAddress,fromAmount,fromChain);
    }else{
        sushiswapRout = { status: 500 ,data: { }}
    }
    if(!excludeExchanges.includes('openocean')){
        openoceanEvmRout =  openoceanEvmService.openoceanEvmRouteHandler(fromToken, toToken,fromAmount,fromAddress);
    }else{
        openoceanEvmRout = { status: 500 ,data: { }}
    }
    if(!excludeExchanges.includes('0x')){
        zeroXroute =  zeroXservice.zeroXrouteHandler(fromToken,decimalsTokenIn, toToken,fromAmount,fromAddress);
    }else{
        zeroXroute = { status: 500 ,data: { }}
    }
    if(!excludeExchanges.includes('paraswap')){
        paraswapRoute =  paraswapService.paraswapRouteHandler(fromToken,decimalsTokenIn, toToken,decimalsTokenOut, fromAmount,fromAddress);
    }else{
        paraswapRoute = { status: 500 ,data: { }}
    }
    const [inTokenRes,outTokenRes,lifi,uniswap , sushiswap,openoceanEvm,zerox,paraswap] = await Promise.all([inputToken,outputToken,lifiRoute, uniswapRout, sushiswapRout,openoceanEvmRout,zeroXroute,paraswapRoute]);
    
    const inToken={
        "address":fromToken,
        "decimals":decimalsTokenIn,
        "symbol":inTokenRes.symbol,
        "current_price":inTokenRes.priceUSD,
        "logo_url":inTokenRes.logoURI
    }
    const outToken={
        "address":toToken,
        "decimals":decimalsTokenOut,
        "symbol":outTokenRes.symbol,
        "current_price":outTokenRes.priceUSD,
        "logo_url":outTokenRes.logoURI
    }
    const quotes = [];
    if (lifi.status == 200 && lifi.data.response == undefined) {
        lifi.data['name'] = 'Lifi';
        quotes.push(lifi.data);
    }
    if (uniswap.status == 200) {
        uniswap.data['name'] = 'Uniswap';
        quotes.push(uniswap.data);
    }
    if (sushiswap.status == 200) {
        sushiswap.data['name'] = 'Sushiswap';
        quotes.push(sushiswap.data);
    }
    if (openoceanEvm.status == 200 && openoceanEvm.data.response == undefined) {
        openoceanEvm.data['name'] = 'OpenoceanEvm';
        quotes.push(openoceanEvm.data);
    }
    else{console.log(openoceanEvm)}
    if (zerox.status == 200 && zerox.data.response == undefined) {
        zerox.data['name'] = '0X';
        quotes.push(zerox.data);
    }if (paraswap.status == 200 && paraswap.data.response == undefined) {
        paraswap.data['name'] = 'Paraswap';
        quotes.push(paraswap.data);
    }
    const transactionDetails = calculateTxDetails(lifi,uniswap , sushiswap);

    return {inToken,outToken,quotes,transactionDetails};
}

const calculateTxDetails = (lifi,uniswap , sushiswap) => {
    let transactionDetails = {};
    let amount = 0;

    // if (lifi.status == 200 && lifi.data.response == undefined){
    //     amount = parseFloat(lifi.data.estimate.toAmountUSD);
    //     transactionDetails = {
    //         "data" :lifi.data.transactionRequest.data,
    //         "value" :lifi.data.transactionRequest.value,
    //         "to" :lifi.data.transactionRequest.to,
    //     };
    // }
    // if ((uniswap.status == 200)){
        
    //     if (parseFloat(uniswap.data.quote.amount) > amount){
    //         amount = parseFloat(uniswap.data.quote.amount);
    //         transactionDetails = {
    //             "data" :uniswap.data.methodParameters.calldata,
    //             "value" :uniswap.data.methodParameters.value,
    //             "to" :uniswap.data.methodParameters.to,
    //         };
    //     }
    // }

    // if ((sushiswap.status == 200)){
    //     if (parseFloat(sushiswap.data.expectedConvertQuote) > amount){
    //         amount = parseFloat(sushiswap.data.expectedConvertQuote);
    //         transactionDetails = {
    //             "data" :sushiswap.data.transaction.data,
    //             "value" :sushiswap.data.transaction.value,
    //             "to" :sushiswap.data.transaction.to,
    //         };
    //     }
    // }

    return transactionDetails;
}

module.exports = {
    allQuotes,
};
