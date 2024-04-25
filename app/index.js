import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui.js/faucet';
await requestSuiFromFaucetV0({
	host: getFaucetHost('testnet'),
	recipient: '0xb0c64d437114da680eaf0b699c784377cf6a54c1df4546627f937ecad2383375',
});