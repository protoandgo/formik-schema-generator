import { Upload, message, Button } from 'antd';
import { LoadingOutlined, InboxOutlined} from '@ant-design/icons'
import { useField, useFormikContext } from 'formik';


// const mime = require('mime-types');
const { Dragger } = Upload;

function beforeUpload(file: { type: string; }) {
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

// function getBase64(file: Blob, callback: (arg0: string | ArrayBuffer | null) => any) {
//   const reader = new FileReader();  
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(file);
// };




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
const handleUpload = (uploadedFile: Blob) => {
  
}
type UploadInputProps = {
  [x: string]: any;
  name: string;
};
const UploadInput = (props: UploadInputProps) => {
  const [field, meta] = useField({ ...props });
  const { setFieldValue } = useFormikContext();
  const file = props.name

    return (
      <>
        <Dragger
          {...field}
          {...props}
          //accept= '.step, .stp, .sldprt, .ipt, .prt, .sat, .catpart, .x_t, .x_b, .pdf, .3dm'
          //value={Blob || null}
          //handleUpload={handleUpload(uploadedFile)}
          // onChange={formik.handleChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </>
    );
}

export default UploadInput;


