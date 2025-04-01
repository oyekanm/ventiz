"use client"

import axios from 'axios';
import { CloudUpload } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'


export default function UploadEventBanner({ onUploadSuccess, image }: any) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const uploadImage = async (files: any) => {

        try {
            const formData = new FormData();
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

            formData.append("file", files[0]);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as any);


            const response = await axios.post(cloudinaryUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                onUploadSuccess(response.data.secure_url);
            }
            // console.log(response)
        } catch (error) {

        }
    };
    const uploadImages = async (files: any) => {
        setIsUploading(true);
        setError('');

        console.log(files)

        try {
            const uploadedUrls = [];
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

            // Process each file sequentially
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as any);

                const response = await axios.post(cloudinaryUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log(response)

                if (response.status === 200) {
                    const data = {
                        id: response.data.version,
                        link: response.data.secure_url
                    };
                    onUploadSuccess(data);
                }
            }

            //   // Update state based on single or multiple mode
            //   if (multiple) {
            //     const newImages = [...images, ...uploadedUrls];
            //     setImages(newImages);
            //     onUploadSuccess(newImages);
            //   } else {
            //     // In single mode, replace the existing image
            //     setImages(uploadedUrls);
            //     onUploadSuccess(uploadedUrls[0]); // Return just the first URL for single mode
            //   }
        } catch (error) {
            console.error("Upload failed:", error);
            setError('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <Dropzone onDrop={acceptedFiles => uploadImages(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="relative h-[22rem] border border-[#E4E7EC] rounded-[1.2rem] p-8 bg-[#F9FAFB] text-center cursor-pointer">
                            {/* 
                            {image && (
                                <img
                                    src={image}
                                    alt={"event image"}
                                    className="w-full h-full  aspect-video object-cover rounded-[1.2rem]"
                                />
                                // <Image
                                //     src={image}
                                //     alt={"event image"}
                                //     className="w-full h-full  aspect-video object-cover rounded-[1.2rem]"
                                //     width={200}
                                //     height={200}
                                // />
                            )} */}
                            <div className='centre flex flex-col justify-center items-center gap-4 '>
                                <span className='bg-white size-16 radius-md border border-[#E4E7EC] mx-auto justify-center items-center flex'>
                                    <CloudUpload className="size-8 mx-auto" />
                                </span>
                                <p className="text-blue-600 font-medium">Click to upload</p>
                                <p className="text-sm text-gray-500">PNG, JPG or JPEG (max. 360×480px; 5MB)</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}
