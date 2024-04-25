'use client'
import { WalletProvider } from '@suiet/wallet-kit';
import "@suiet/wallet-kit/style.css";
import React, { ReactNode } from 'react'
// import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
// import { getFullnodeUrl } from '@mysten/sui.js/client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Config options for the networks you want to connect to
// const { networkConfig } = createNetworkConfig({
//     testnet: { url: getFullnodeUrl('testnet') },
// 	localnet: { url: getFullnodeUrl('localnet') },
// 	mainnet: { url: getFullnodeUrl('mainnet') },
// });
// const queryClient = new QueryClient();

const Layout: React.FC<{children?:ReactNode}> = ({children}) => {
  return (    
        //  <QueryClientProvider client={queryClient}>
		// 	<SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
		// 	</SuiClientProvider>
		// </QueryClientProvider>
		<WalletProvider>
					{children}
		</WalletProvider>
  )
}

export default Layout