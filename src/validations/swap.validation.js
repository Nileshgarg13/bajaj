const Joi = require('joi');
const { objectId } = require('./custom.validation');

exports.allQuotesEVM = {
  query: Joi.object().keys({
    fromChain: Joi.number().required(),
    toChain: Joi.number().required(),
    fromToken: Joi.string().required(),
    toToken: Joi.string().required(),
    fromAmount: Joi.number().required(),
    fromAddress: Joi.string().required(),
    decimalsTokenIn: Joi.number().required(),
    decimalsTokenOut: Joi.number().required(),
    excludeExchanges: Joi.string().optional().empty('')
  }),
};

exports.allQuotesAptos = {
  query: Joi.object().keys({
    chainId: Joi.number().required(),
    fromToken: Joi.string().required(),
    fromTokenSymbol: Joi.string().required(),
    toToken: Joi.string().required(),
    toTokenSymbol: Joi.string().required(),
    fromAmount: Joi.number().required(),
    fromAddress: Joi.string().required(),
    toAddress: Joi.string().default('0x0'),
    decimalsTokenIn: Joi.number().required(),
    decimalsTokenOut: Joi.number().required(),
    excludeExchanges: Joi.string().optional().empty('')
  }),
};