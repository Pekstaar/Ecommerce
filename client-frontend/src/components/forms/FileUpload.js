import axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";

const FileUpload = ({ user, values, setValues, setLoading }) => {
  const fileUploadAndResize = (e) => {
    // upload connnections
    // console.log(e.target.files);
    //   uploaded file resize
    let files = e.target.files;
    let uploadFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RESPONSE", res);
                uploadFiles.push(res.data);
                setValues({ ...values, images: uploadFiles });

                setLoading(false);
              })
              .catch((err) => {
                console.log("Cloudinary upload error!", err);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  return (
    <label
      className="btn col-6 btn-primary btn-raised "
      style={{
        fontSize: "16px",
        fontStyle: "italic",
        fontWeight: "500",
        marginTop: "6px",
      }}
    >
      CHOOSE FILE UPLOAD:
      <input
        type="file"
        multiple
        hidden
        accept="images/*"
        onChange={fileUploadAndResize}
      />
    </label>
  );
};

export default FileUpload;
