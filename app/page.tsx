'use client'

import { TransactionBlock } from "@mysten/sui.js/transactions";
import { ConnectButton, addressEllipsis, useWallet } from "@suiet/wallet-kit";
import { useState } from "react";


export default function Home({children}:{children: React.ReactNode}) {
	const wallet = useWallet();
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl((prevImageUrl) =>
      prevImageUrl === imageUrl ? "" : imageUrl
    );
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImageUrl(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  async function mintNft() {
    if (!wallet.connected) return;
    if (!name || !description || !selectedImageUrl) {
      alert("Please fill in all fields: Name, Description, and Image URL.");
      return;
    }
    const txb = createMintNftTxnBlock(name,description,selectedImageUrl);
    try {
      // call the wallet to sign and execute the transaction
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });
      console.log("nft minted successfully!", res);
      alert("Congrats! your nft is minted!");
    } catch (e) {
      alert("Oops, nft minting failed");
      console.error("nft mint failed", e);
    }
  }
  function createMintNftTxnBlock(
    name: string,
    description: string,
    image_url: string
  ) {
    // define a programmable transaction block
    const txb = new TransactionBlock();
  
    // note that this is a devnet contract address
    const contractAddress =
      "0x94da855248247602756c7ab111cac9a0ba35831965c9d4b2cc968147d8cc1f7b";
    const contractModule = "nft";
    const contractMethod = "mint";
    txb.moveCall({
      target: `${contractAddress}::${contractModule}::${contractMethod}`,
      arguments: [
        txb.pure(name),
        txb.pure(description),
        txb.pure(image_url),
      ],
    });
  
    return txb;
  }
  return (
    <div className="w-full h-screen bg-slate-200 overflow-auto">
      <div className="min-[1000px]:p-40 min-[600px]:p-10 min-[400px]:p-4 p-2 flex flex-col space-y-20">
        <div
          className="font-extrabold text-transparent min-[500px]:text-6xl text-3xl bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-sky-500 w-fit">
          Mint NFT on Sui Testnet
        </div>
        <div className="w-full flex flex-col space-y-10">
          <ConnectButton/>
          {wallet.account&&(
            <div className="border-slate-300 bg-slate-100 shadow-xl border rounded-xl p-10 flex flex-col space-y-10">
              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-6">
                  <label className="text-2xl">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
                    placeholder="NFT name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-6">
                  <label className="text-2xl">Description</label>
                  <input
                    type="text"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
                    placeholder="NFT description"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>
              </div>
              <div className="text-2xl">
                Choose the image for your NFT
              </div>
              <div className="grid grid-cols-4 min-[1000px]:gap-10 min-[600px]:gap-4 min-[400px]:gap-2 gap-1">
                <img
                  className={`h-full hover:scale-105 hover:brightness-125 rounded-xl cursor-pointer ${
                    selectedImageUrl === 'https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4'
                      ? 'border-4 p-2 border-blue-500'
                      : ''
                  }`}
                  src="https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4"
                  alt="nft"
                  onClick={() =>
                    handleImageClick('https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4')
                  }
                />
                <img
                  className={`h-full hover:scale-105 hover:brightness-125 rounded-xl cursor-pointer ${
                    selectedImageUrl === 'https://static.ybox.vn/2022/5/5/1653618217752-nguyen-nu-anh-thu35zz5xt5-avatar.png'
                      ? 'border-4 p-2 border-blue-500'
                      : ''
                  }`}
                  src="https://static.ybox.vn/2022/5/5/1653618217752-nguyen-nu-anh-thu35zz5xt5-avatar.png"
                  alt="nft"
                  onClick={() =>
                    handleImageClick('https://static.ybox.vn/2022/5/5/1653618217752-nguyen-nu-anh-thu35zz5xt5-avatar.png')
                  }
                />
                <img
                  className={`h-full hover:scale-105 hover:brightness-125 rounded-xl cursor-pointer ${
                    selectedImageUrl === 'https://lw3-teams-logos.s3.us-east-2.amazonaws.com/Sui%20Foundation-team-logo'
                      ? 'border-4 p-2 border-blue-500'
                      : ''
                  }`}
                  src="https://lw3-teams-logos.s3.us-east-2.amazonaws.com/Sui%20Foundation-team-logo"
                  alt="nft"
                  onClick={() =>
                    handleImageClick('https://lw3-teams-logos.s3.us-east-2.amazonaws.com/Sui%20Foundation-team-logo')
                  }
                />
                <img
                  className={`h-full hover:scale-105 hover:brightness-125 rounded-xl cursor-pointer ${
                    selectedImageUrl === 'https://airnfts.s3.amazonaws.com/nft-images/20210522/SUMMER_HOUSE_ILUSTRATIONS_1621648119342.jpg'
                      ? 'border-4 p-2 border-blue-500'
                      : ''
                  }`}
                  src="https://airnfts.s3.amazonaws.com/nft-images/20210522/SUMMER_HOUSE_ILUSTRATIONS_1621648119342.jpg"
                  alt="nft"
                  onClick={() =>
                    handleImageClick('https://airnfts.s3.amazonaws.com/nft-images/20210522/SUMMER_HOUSE_ILUSTRATIONS_1621648119342.jpg')
                  }
                />
              </div>
              <div className="flex flex-col space-y-6">
                <label className="text-2xl">
                  Or you can add link by yourself 
                </label>
                <input
                  type="text"
                  id="image_url"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
                  placeholder="your_image_url"
                  value={selectedImageUrl}
                  onChange={handleImageUrlChange}
                  required
                />
                
              </div>
              <button className="font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-xl px-8 py-4 w-fit mx-auto"
              onClick={mintNft}>
                Mint nft
              </button>
            </div>
          )}
        </div>
      </div>
		</div>
  );
}
