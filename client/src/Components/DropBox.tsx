import axios from 'axios'
import React, { useState } from 'react'
import DownLoadFile from './DownLoadFile'
import DropZone from './DropZone'
import RenderFile from './RenderFile'

function DropBox() {
    const [file, setFile] = useState<File | null>(null)
    const [id, setId] = useState(null)
    const [downloadPageLink, setDownloadPageLink] = useState(null)
    const [uploadState, setUploadState] = useState<"Uploading" | "upload Failed" | "Upload" | "uploaded">("Upload")

    const handleUpload = async () => {
        if (uploadState === 'Uploading') return
        setUploadState('Uploading')
        if (file) {
            const formData = new FormData();
            formData.append("myFile", file);
            try {
                const { data } = await axios({
                    method: 'post',
                    data: formData,
                    url: 'api/files/upload',
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                setDownloadPageLink(data.downloadLink)
                setId(data.id)

            } catch (error) {
                console.log(error)
                setUploadState('upload Failed')
            }
        }
    }

    const resetComponent = () =>{
        setFile(null)
        setDownloadPageLink(null)
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='font-medium text-3xl my-4'>Share Files</h1>
            <div className="w-96 flex flex-col items-center shadow-xl rounded-xl bg-gray-800 justify-center">
                {!downloadPageLink && <DropZone setFile={setFile} />}
                {file && (
                    <RenderFile
                        file={{
                            format: file.type.split("/")[1],
                            name: file.name,
                            sizeInBytes: file.size,
                        }} />
                )}
                {!downloadPageLink && file && (

                    <button className='p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none' onClick={handleUpload}>{uploadState}</button>
                )}
                {
                    downloadPageLink &&
                    <div className='p-2 text-center'>
                        <DownLoadFile downloadPageLink={downloadPageLink} />
                        <button className='p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none' onClick={resetComponent}>Upload New File</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default DropBox
