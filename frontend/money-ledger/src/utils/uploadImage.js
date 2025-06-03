//for locally storing uploaded profile pictures
// import { API_PATHS } from "./apiPaths";
// import axiosInstance from "./axiosInstance";

// const uploadImage=async(imageFile)=>{
//     const formData=new FormData();
//     //append image file to form data
//     formData.append('image',imageFile);

//     try {
//         const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         })
//         return response.data;
//     } catch (error) {
//         console.error('Error Uploading the image',error);
//         throw error; // rethrow error for handling
//     }
// }

// export default uploadImage;


//for storing images on cloudinary 
const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_preset"); // replace with your preset
    formData.append("folder", "profile_pictures"); // optional
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dzaynlgnf/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.secure_url) {
        return { imageUrl: data.secure_url };
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };
  
  export default uploadImage;
  