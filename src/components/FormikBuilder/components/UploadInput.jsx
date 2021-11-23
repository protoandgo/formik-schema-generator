import { Upload, message, Button } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'

// const mime = require('mime-types');

function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

function beforeUpload(file) {
  const isValidFile = file.type === "" || file.type === "image/png";
  if (!isValidFile) {
    message.error("You can only upload 'step', 'stp','sldprt', 'ipt', 'prt', 'sat', 'catpart', 'x_t', 'x_b', 'pdf','3dm', file!");
  }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
  return isValidFile;  //&& isLt2M
}


// const props = {
//   name: "file",
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

// ReactDOM.render(
//   <Upload {...props}>
//     <Button icon={<UploadOutlined />}>Click to Upload</Button>
//   </Upload>,
//   document.getElementById("container")
// );

const UploadInput = () => {
    return (
        <></>
    )
}

export default UploadInput;