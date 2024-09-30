import React, { useRef, useState, useEffect } from "react";
// import PostPreviewModal from "../../Dashboard/WritePost/PostPreviewModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram } from "../../../Utils/anchorClient";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import RequestProof from "./RequestProof";

const SourceProofPost = () => {
  const editorRef = useRef(null);
  const mediaUrlRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const [proofSignatures, setProofSignatures] = useState(null);
  const [isDropdownHidden, setIsDropdownHidden] = useState(false);
  const { connected, publicKey, wallet } = useWallet();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedProofId, setSelectedProofId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");

  const navigate = useNavigate();

  const handleProofSelect = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "github") {
      setSelectedProofId(0);
    } else if (selectedValue === "aadhar") {
      setSelectedProofId(1);
    }

    setIsSheetOpen(true);
  };

  const handleProofGenerated = (signatures) => {
    setProofSignatures(signatures);
    setIsDropdownHidden(true);
    setIsSheetOpen(false);
    console.log(proofSignatures);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handlePublish = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    const program = getProgram(wallet.adapter);
    const title = document.querySelector('input[placeholder="Enter title here"]').value;
    const content = editorRef.current?.innerHTML;
    const media = selectedImage || "";
    const source = document.querySelector('input[placeholder="URL / Description"]').value;

    if (!title || !content || !source || !proofSignatures) {
      alert("All fields are required.");
      return;
    }

    try {
      setTransactionPending(true);

      const [userPda] = findProgramAddressSync([Buffer.from("user"), publicKey.toBuffer()], program.programId);
      const user = await program.account.user.fetch(userPda);
      const lastPostId = user.lastPostId;

      const [postPda] = findProgramAddressSync(
        [Buffer.from("post"), publicKey.toBuffer(), new Uint8Array([lastPostId])],
        program.programId
      );

      await program.methods
        .createPost(title, media, content, source, proofSignatures)
        .accounts({
          userAccount: userPda,
          postAccount: postPda,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      alert("Post published successfully!");
      handleMoveToTrash();
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post. See console for details.");
    } finally {
      setTransactionPending(false);
    }
  };

  const handleAddMedia = () => {
    const url = mediaUrlRef.current.value || "";
    if (url) {
      setSelectedImage(url);
      localStorage.setItem("selectedImage", url);
      console.log("Image URL set to state and localStorage:", url);
    }
  };

  const handlePreviewClick = () => {
    const url = mediaUrlRef.current.value.trim();
    if (url) {
      setSelectedImage(url);
      setIsPreviewOpen(true);
    } else {
      alert("Please enter a valid image URL.");
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  useEffect(() => {
    const storedMedia = localStorage.getItem("selectedImage");
    if (storedMedia) {
      setSelectedImage(storedMedia);
      console.log("Loaded media from localStorage:", storedMedia);
    }
  }, []);

  return (
    <>
      <div className="bg-gray-100 p-6 shadow-lg rounded-lg mb-6">
        <h4 className="pb-4 text-black text-2xl font-semibold">Source of Data</h4>
        <input
          type="text"
          placeholder="URL / Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
        <h4 className="pb-2 text-black text-xl">Proof of Authentication</h4>
        {!isDropdownHidden && (
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            defaultValue=""
            onChange={handleProofSelect}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="aadhar">Aadhar Authentication</option>
            <option value="github">GitHub Authentication</option>
          </select>
        )}

        {proofSignatures && (
          <input
            type="text"
            value={proofSignatures}
            readOnly
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mt-2"
          />
        )}
      </div>

      {isSheetOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <button onClick={handleCloseSheet} className="text-black mb-4">
              Close
            </button>
            <RequestProof id={selectedProofId} onProofGenerated={handleProofGenerated} />
          </div>
        </div>
      )}
{/* 
      {isPreviewOpen && (
        <PostPreviewModal
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          title={title}
          content={editorRef.current?.innerHTML}
          media={selectedImage}
          source={source}
          proofSignatures={proofSignatures}
        />
      )} */}
    </>
  );
};

export default SourceProofPost;
