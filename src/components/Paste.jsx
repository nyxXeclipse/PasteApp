import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { FormatDate } from "../utlis/formatDate";
import { Pencil, Eye, Trash2, Copy, Share2 } from "lucide-react";


const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
        })
        .then(() => toast.success("Shared successfully"))
        .catch(() => toast.error("Sharing cancelled"));
    } else {
      navigator.clipboard.writeText(paste.content);
      toast.success("Sharing not supported, content copied instead");
    }
  }
  
  return (
    <div>
      <input 
      className='p-2 rounded-2xl min-w-[600px] mt-5'
      type='search'
      placeholder='search here'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'> 
        {
          filteredData.length > 0 && 
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <Link to={`/?pasteId=${paste?._id}`}>
                    <button title="Edit" className="hover:text-blue-600">
                      <Pencil size={20} />
                    </button>
                  </Link>

                  <Link to={`/pastes/${paste._id}`}>
                    <button title="View" className="hover:text-green-600">
                      <Eye size={20} />
                    </button>
                  </Link>

                  <button
                    title="Delete"
                    onClick={() => handleDelete(paste?._id)}
                    className="hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>

                  <button
                    title="Copy"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="hover:text-purple-600"
                  >
                    <Copy size={20} />
                  </button>

                  <button
                    title="Share"
                    onClick={() => handleShare(paste)}
                    className="hover:text-orange-600"
                  >
                    <Share2 size={20} />
                  </button>
    
                </div>

                <div className="text-sm text-gray-500">
                  {FormatDate(paste.createdAt)}
                </div>
                
              </div>
            );
          } ) 
        }
      </div>
    </div>
  )
}

export default Paste
