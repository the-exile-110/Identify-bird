import axios from "axios";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function BirdesModel() {
  const [result, setResult] = useState("");
  const [files, setFiles] = useState([]);

  const submitForm = (data, setResponse) => {
    axios({
      url: "https://fast-api-h2faipn4ga-ue.a.run.app/image_predic",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        setResponse("error");
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
      submitForm(formData, (msg) => setResult(msg["result"]));
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5242880,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="h-60">
      <img
        className=" block  max-w-full max-h-full rounded-md shadow-lg"
        src={file.preview}
      />
    </div>
  ));

  return (
    <div className="flex flex-col w-full mt-64 content-center items-center justify-center">
      <div className="mb-10 mt-64 flex flex-col w-full  content-center items-center justify-center">
        <img src="/logo.png" alt="what birds" />
        <h2 className="text-4xl font-bold text-gray-700">What birds?</h2>
        <p>Whatbirds is a web app for bird identification.</p>
        <p>
          It covers 260 species of birds, and all bird materials are collected
          from the internet.
        </p>
      </div>
      <div className="bg-white m-5 rounded-md shadow-lg">
        <div
          {...getRootProps()}
          className={`flex w-52 h-52 border-2 m-20 border-dotted rounded-md shadow-md text-center content-center justify-center items-center align-middle  ${
            isDragActive ? "border-green-600" : "border-gray-700"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drag and drop here....</p>
          ) : (
            <p>Drag and drop or click here to upload pictures</p>
          )}
        </div>
      </div>
      <div className=" max-h-xl max-w-xl">
        <aside className="flex flex-col pt-20  m-20 mb-10 max-h-20 max-w-20 content-center justify-center items-center align-middle">
          {thumbs}
          <p className="mt-5 pb-10 text-xl font-bold text-gray-800">
            <span>{result[0]}</span>
          </p>
        </aside>
      </div>
    </div>
  );
}
