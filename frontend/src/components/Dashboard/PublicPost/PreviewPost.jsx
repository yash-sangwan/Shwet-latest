import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram } from "../../../Utils/anchorClient";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

const PreviewPost = () => {
  const editorRef = useRef(null);
  const mediaUrlRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const [proofSignatures, setProofSignatures] = useState(null);
  const { connected, publicKey, wallet } = useWallet();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    const program = getProgram(wallet.adapter);
    const title = document.querySelector(
      'input[placeholder="Enter title here"]'
    ).value;
    const content = editorRef.current?.innerHTML;
    const media = selectedImage || "";
    const source = document.querySelector(
      'input[placeholder="URL / Description"]'
    ).value;

    if (!title || !content || !source || !proofSignatures) {
      alert("All fields are required.");
      return;
    }

    try {
      setTransactionPending(true);

      const [userPda] = findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );

      const user = await program.account.user.fetch(userPda);
      const lastPostId = user.lastPostId;

      const [postPda] = findProgramAddressSync(
        [
          Buffer.from("post"),
          publicKey.toBuffer(),
          new Uint8Array([lastPostId]),
        ],
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
      navigate("/read/home");
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
    }
  };

  const handleContentInput = () => {
    const text = editorRef.current.innerText || "";
    const words = text.trim().split(/\s+/);
    const wordCount = words.filter((word) => word !== "").length;

    if (wordCount > 200) {
      const truncatedText = words.slice(0, 200).join(" ");
      editorRef.current.innerText = truncatedText;
      setWordCount(200);
    } else {
      setWordCount(wordCount);
    }
    setContent(editorRef.current.innerHTML);
  };

  const handleMoveToTrash = () => {
    setTitle("");
    setContent("");
    setSource("");
    setSelectedImage("");
    setProofSignatures(null);
    editorRef.current.innerHTML = "";
    setWordCount(0);
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
    }
  }, []);

  return (
    <>
      <div className="w-1/4 mt-32 mr-3 fixed right-0">
        <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
          <h3 className="font-semibold text-black mb-2">Publish</h3>

          <button
            // onClick={handlePreviewClick}
            className="bg-gray-200 cursor-not-allowed text-black w-full p-2 mb-2 rounded"
          >
            Preview
          </button>
          <div className="text-gray-500 text-sm mb-2">
            Status: <span className="text-green-600 font-semibold">Draft</span>
          </div>
          <div className="text-gray-500 text-sm mb-2">
            Visibility:{" "}
            <span className="text-blue-600 font-semibold">Public</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleMoveToTrash}
              className="bg-red-500 text-white w-1/2 p-2 rounded hover:bg-red-600"
            >
              Move to Trash
            </button>
            <button
              onClick={handlePublish}
              className={`bg-primary text-white w-1/2 p-2 rounded hover:bg-secondary ${
                transactionPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={transactionPending}
            >
              {transactionPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewPost;
