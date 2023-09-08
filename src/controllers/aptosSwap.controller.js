const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const constants = require('../config/constants');

const {convertValueToDecimal} = require("@pontem/liquidswap-sdk");

const {helperFunctions, openoceanService, liquidswapService, animeswapService, cetusService, auxService, pancakeService, coinService} = require('../services');

const allQuotes = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['chainId','fromToken', 'fromTokenSymbol', 'toToken', 'toTokenSymbol', 'fromAmount', 'fromAddress', 'toAddress','decimalsTokenIn','excludeExchanges','decimalsTokenOut']);

    let excludeExchanges = [];
    if (filter.hasOwnProperty('excludeExchanges') && (filter['excludeExchanges'] != '')) {
         excludeExchanges = helperFunctions.stringToArray(filter['excludeExchanges']);
    }

    const addressPattern = /^0x[a-fA-F0-9]{64}$/;
    const addressRegExp = new RegExp(addressPattern);
    

    if(addressRegExp.test(filter['toAddress']) == false){
        filter['toAddress'] = filter['fromAddress']
    }

    if(filter['fromAddress'] != filter['toAddress']){
        excludeExchanges.push('openocean')
        excludeExchanges.push('aptosswap')
    }

    let response = {}
    if (filter['chainId'] == 1) {
        const inTokenData = await coinService.getCoinDetails(filter['fromToken']);
        const outTokenData = await coinService.getCoinDetails(filter['toToken']);
        response = await aptosMainnet(filter['fromToken'], filter['toToken'], filter['fromAmount'], filter['fromAddress'], filter['toAddress'], filter['decimalsTokenIn'], excludeExchanges);

        const [inToken, outToken] = await Promise.all([inTokenData, outTokenData]);

        response = addDetails(response,filter['fromTokenSymbol'], filter['fromToken'], filter['fromAmount'], filter['toTokenSymbol'], filter['toToken'], filter['decimalsTokenIn'],filter['decimalsTokenOut'],inToken, outToken);
    }
        
    else if(filter['chainId'] == 2){
        
        const inTokenData = coinService.detailsFaliureStruct
        const outTokenData = coinService.detailsFaliureStruct

        response = await aptosTestnet(filter['fromToken'], filter['toToken'], filter['fromAmount'], filter['decimalsTokenIn'], excludeExchanges);
        response = addDetails(response,filter['fromTokenSymbol'], filter['fromToken'], filter['fromAmount'], filter['toTokenSymbol'], filter['toToken'], filter['decimalsTokenIn'],filter['decimalsTokenOut'],inTokenData, outTokenData);
    }
    

    res.send(response);
});

const aptosMainnet = async (
    fromToken,
    toToken,
    fromAmount,
    fromAddress,
    toAddress,
    decimalsTokenIn,
    excludeExchanges 
) =>{
    let openoceanRoute = {};
    let liquidswapRoute = {};
    let animeswapRoute = {};
    let cetusRoute = {};
    let pancakeRoute = {};
    let auxRoute = {};

    if(!excludeExchanges.includes('openocean')){
        openoceanRoute =  openoceanService.openoceanRouteHandler(fromToken,toToken,fromAmount,fromAddress);
    }else{
        openoceanRoute = {status: 500}
    }
    if(!excludeExchanges.includes('liquidswap')){
        liquidswapRoute =  liquidswapService.liquidswapRouteHandler(fromToken,toToken,fromAmount,toAddress,decimalsTokenIn);
    }else{
        liquidswapRoute = {status: 500}
    }
    if(!excludeExchanges.includes('animeswap')){
        animeswapRoute =  animeswapService.animeswapRouteHandler(constants.aptos.networks.MAINNET,fromToken, toToken, fromAmount, decimalsTokenIn, toAddress);
    }else{
        animeswapRoute = {status: 500}
    }
    if(!excludeExchanges.includes('cetus')){
        cetusRoute =  cetusService.cetusRouteHandler(fromToken,toToken,fromAmount,toAddress,decimalsTokenIn);
    }else{
        cetusRoute = {status: 500}
    }
    if(!excludeExchanges.includes('pancake')){
        pancakeRoute =  pancakeService.pancakeRouteHandler(fromToken,toToken,fromAmount,toAddress,decimalsTokenIn);
    }else{
        pancakeRoute = {status: 500}
    }
    if(!excludeExchanges.includes('aux')){
        auxRoute =  auxService.auxRouteHandler(fromToken,toToken,fromAmount,toAddress,decimalsTokenIn);
    }else{
        auxRoute = {status: 500}
    }

    const [openocean,liquidswap,animeswap, cetus, pancake, aux] = await Promise.all([openoceanRoute, liquidswapRoute, animeswapRoute, cetusRoute, pancakeRoute, auxRoute]);
    let quotes = []
    if (openocean.status == 200) {
        quotes.push(openocean.data);
    }
    if (liquidswap.status == 200) {
        quotes.push(liquidswap.data);
    }
    if (animeswap.status == 200) {
        quotes =  quotes.concat(animeswap.data);
    }
    if (cetus.status == 200) {
        quotes.push(cetus.data);
    }
    if (pancake.status == 200) {
        quotes.push(pancake.data);
    }
    if (aux.status == 200) {
        quotes.push(aux.data);
    }

    return {quotes};

}

const aptosTestnet = async (
    fromToken,
    toToken,
    fromAmount,
    decimalsTokenIn,
    excludeExchanges
) =>{
    let animeswapRoute = {};
    if(!excludeExchanges.includes('animeswap')){
        animeswapRoute =  animeswapService.animeswapRouteHandler(constants.aptos.networks.TESTNET,fromToken,toToken,fromAmount,decimalsTokenIn);
    }else{
        animeswapRoute = {status: 500}
    }
    const [animeswap] = await Promise.all([animeswapRoute]);
    
    let quotes = []
    if (animeswap.status == 200) {
        quotes.push(animeswap.data);
    }
    return {quotes};
}


// const calculateTxDetails = (quotes) =>{

    
//     let bestOutput = 0;
//     let transactionDetails = {};

//     for(let i=0;i<quotes.length;i++){
//         if (parseInt(quotes[i].outAmount) > bestOutput){
//             bestOutput = parseInt(quotes[i].outAmount);
//             transactionDetails = quotes[i].txData;
//         }
//     }

//     if(transactionDetails.hasOwnProperty('arguments')){
//         for(let i=0;i<transactionDetails.arguments.length;i++){
//             if(transactionDetails.arguments[i].includes('.')){
//                 transactionDetails.arguments[i] = helperFunctions.convertToWholeNumberAndString(transactionDetails.arguments[i]);
//             }
//         }
//     }

//     return transactionDetails;
// }

const addDetails = (incompleteResponse,
        fromTokenSymbol,
        fromTokenAddress,
        fromAmount,
        toTokenSymbol,
        toTokenAddress,
        decimalsTokenIn,
        decimalsTokenOut,
        inTokenDetails,
        outTokenDetails) =>{
    let quotes = incompleteResponse.quotes;
    let response = {
        inToken : {
            address : fromTokenAddress,
            symbol : fromTokenSymbol,
            decimals : decimalsTokenIn,
            current_price : inTokenDetails.data.data.current_price,
            change24h_price : inTokenDetails.data.data.change24h_price,
            current_num_holder : inTokenDetails.data.data.current_num_holder,
            total_transfer : inTokenDetails.data.data.total_transfer,
            total_supply : inTokenDetails.data.data.total_supply,
            logo_url : inTokenDetails.data.data.logo_url,
        },
        outToken : {
            address : toTokenAddress,
            symbol : toTokenSymbol,
            decimals : decimalsTokenOut,
            current_price : outTokenDetails.data.data.current_price,
            change24h_price : outTokenDetails.data.data.change24h_price,
            current_num_holder : outTokenDetails.data.data.current_num_holder,
            total_transfer : outTokenDetails.data.data.total_transfer,
            total_supply : outTokenDetails.data.data.total_supply,
            logo_url : outTokenDetails.data.data.logo_url,
        },

        inAmount : convertValueToDecimal(fromAmount,decimalsTokenIn).toString(),
    };

    const marketRate = parseFloat(inTokenDetails.data.data.current_price) / parseFloat(outTokenDetails.data.data.current_price) * parseFloat(fromAmount);

    response.inAmountUSD = inTokenDetails.data.data.current_price * (parseFloat(fromAmount))


    for(let i=0;i<quotes.length;i++){
        if(outTokenDetails!=undefined && outTokenDetails.status == 200){
            quotes[i].outAmountUSD = outTokenDetails.data.data.current_price * (parseInt(quotes[i].outAmount) / Math.pow(10,decimalsTokenOut))
            quotes[i].priceImpact = -1 * ((marketRate - quotes[i].outAmountUSD) / marketRate * 100);

        }
    }
    response.quotes = quotes;
    return response;
}

module.exports = {
    allQuotes,
};
