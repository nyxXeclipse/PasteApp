import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes } from "../redux/pasteSlice";
import { updateToPastes } from "../redux/pasteSlice";
import { useState } from "react";
import toast from "react-hot-toast";


const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId) {
      //update
      dispatch(updateToPastes(paste));
    }
    else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or update
    setTitle('');
    setValue('');
    setSearchParams({});

  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1  pl-4 rounded-2xl mt-2 w-[66]%"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="relative mt-8 w-fit">
        <button
          onClick={() => {
            if (!value) {
              toast.error("Nothing to copy");
              return;
            }
            navigator.clipboard.writeText(value);
            toast.success("Copied to clipboard");
          }}
          className="absolute top-6 right-3 z-10 px-3 py-1 text-sm rounded-lg 
          bg-gray-700 text-white hover:bg-gray-600"
        >
          Copy
        </button>

        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 pr-20"
          value={value}
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
