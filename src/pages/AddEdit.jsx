// 추가하고 수정하는 페이지입니다.

import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { addNewPost, updatePost, getPost } from "../api/firebase";
import { uploadImage } from "../api/uploader";

const initialState = {
  title: "",
  location: "",
  desc: "",
  contact: "",
};

export default function AddEdit() {
  const { user } = useAuthContext();
  const { postId } = useParams();

  useEffect(() => {
    postId && getPost(postId).then((post) => setData(post));
  }, [postId]);

  const [data, setData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "file"
      ? setFile(e.target.files[0])
      : setData({ ...data, [name]: value });
  };

  //postId의 유무(업데이트 or 첫등록) file의 유무에 따라 등록을 달리해야한다.
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    //처음 등록시에는 사진 필수
    if (!postId) {
      uploadImage(file) //
        .then((url) => {
          addNewPost(user, data, url) //
            .then(() => {
              setSuccess("글이 등록되었습니다.");
              setTimeout(() => {
                setSuccess(null);
                navigate("/");
              }, 2000);
            });
        })

        .finally(() => {
          setIsUploading(false);
        });
    } else {
      //수정시에는 사진 수정 없는 경우도 고려
      file
        ? uploadImage(file) //
            .then((url) => {
              updatePost(postId, data, url) //
                .then(() => {
                  setSuccess("글이 수정되었습니다.");
                  setTimeout(() => {
                    setSuccess(null);
                    navigate("/");
                  }, 2000);
                });
            })
        : updatePost(postId, data) //
            .then(() => {
              setSuccess("글이 수정되었습니다.");
              setTimeout(() => {
                setSuccess(null);
                navigate("/");
              }, 2000);
            })
            .finally(() => {
              setIsUploading(false);
            });
    }
  };

  return (
    <div className="container">
      <h2>{postId ? "EditPost" : "Add User"}</h2>
      {success && <p>✅{success}</p>}
      {postId && !file && <img src={data.img} alt="cloudinary file" />}
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={data.title}
          placeholder="제목"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          value={data.location}
          placeholder="잃어버린 장소"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          value={data.desc}
          placeholder="상세설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          value={data.contact}
          placeholder="연락처"
          required
          onChange={handleChange}
        />
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleChange}
        />
        <button disabled={isUploading}>{postId ? "수정" : "등록"}</button>
      </form>
    </div>
  );
}
