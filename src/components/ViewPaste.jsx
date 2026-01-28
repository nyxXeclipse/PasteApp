import { NavLink, useParams } from 'react-router-dom'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes } from "../redux/pasteSlice";
import { updateToPastes } from "../redux/pasteSlice";
import { useState } from "react";
import toast from "react-hot-toast";

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1  pl-4 rounded-2xl mt-2 w-[66]%"
          type="text"
          placeholder="enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}

      </div>

      <div className="relative mt-8 w-fit">
        <button
          onClick={() => {
            if (!paste?.content) {
              toast.error("Nothing to copy");
              return;
            }
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied to clipboard");
          }}
          className="absolute top-6 right-3 z-10 px-3 py-1 text-sm rounded-lg 
          bg-gray-700 text-white hover:bg-gray-600"
        >
          Copy
        </button>

        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 pr-20"
          value={paste.content}
          disabled
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
}

export default ViewPaste
