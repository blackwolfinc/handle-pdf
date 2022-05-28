import React, { useEffect, useState } from 'react'
import { Worker  , Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import FilePdf from '../../Assets/test.pdf'
// import dropzone file 
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'



export const HandlePdf = () => {
    
const [File, setFile] = useState([])
const [HandleStatus, setHandleStatus] = useState("")
    
useEffect(() => {
console.log(HandleStatus)
}, [HandleStatus])



const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    files.length > 0 && setFile(URL.createObjectURL(files[0]));
};



// function dasar dari react deopzone 
// memproses ketika upload 
const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
//  fungsi yang bakal di panggil ketika status nya berubah
const handleChangeStatus = ({ meta, file }, status) => {
    setHandleStatus(status)
    if (status =="done") {
        setFile(URL.createObjectURL(file))
    }
}

// fungsi yang akan berjalan ketikan di submit 
const handleSubmit = (files, allFiles) => {
        console.log(files , "ini files")
        console.log(allFiles , "ini allFiles")
        // untuk mengset viewer dari react dropzone
setFile(URL.createObjectURL(files[0].file));

}
  return (
    <div>

    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      autoUpload={true}
      accept="application/pdf"
    />


      {/* <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="application/pdf"
    /> */}

    <input type="file" accept='.pdf' onChange={onChange}/>

    <hr/>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
        <Viewer fileUrl={File} />;
        </Worker>
    </div>
  )
}
