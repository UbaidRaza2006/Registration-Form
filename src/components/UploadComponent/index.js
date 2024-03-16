import { useState } from 'react';
import { message, Upload} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { firebaseConfig, firebaseStorageURL } from '../../utils';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { firebaseConfig, firebaseStorageURL } from '../utils';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL)

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();

  const randomStringValue = Math.random().toString(36).substring(2, 16)
  return `${getFile.name}-${timeStamp}-${randomStringValue}`

}

async function helperForUploadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageRefrence = ref(storage, `registration/${getFileName}`);
  
  // Set the content type based on the file type
  // const metadata = { contentType: file.type };

  const uploadImage = uploadBytesResumable(storageRefrence, file);

  return new Promise((resolve, reject) => {
      uploadImage.on('state_changed', (snapshot) => { }, (error) => {
          console.log(error);
          reject(error);
      }, () => {
          // const contentType = uploadImage.snapshot.metadata.contentType;
          // console.log("Image Content Type:", contentType);

          getDownloadURL(uploadImage.snapshot.ref)
              .then(downloadUrl => resolve(downloadUrl))
              .catch(error => reject(error));
      });
  });
}

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  async function handleChange(info) {
    if (info.file.status === 'uploading') {
        setLoading(true);
        return;
    }

    if (info.file.status === 'done') {
        // Get this url from response in the real world.
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });

        console.log(info.file);

        try {
            const extractImageUrl = await helperForUploadingImageToFirebase(info.file);
            console.log("extractImageUrl:", extractImageUrl);

            if (extractImageUrl) {
                localStorage.setItem("firebase",extractImageUrl)
            }
        } catch (error) {
            console.error("Error extracting image URL:", error);
        }
    }
}

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  );
};

export default ImageUpload;
