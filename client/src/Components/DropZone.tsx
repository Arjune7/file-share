import { Dispatch, FunctionComponent, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import folder from '../assets/folder.png'

const DropZone: FunctionComponent<{ setFile: Dispatch<any> }> = ({ setFile }) => {
    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles)
        setFile(acceptedFiles[0])
    }, [])

    const accept = {
        "image/*": [".jpg", ".jpeg", ".png", ".gif"],
        "application/pdf": [".pdf"],
    };

    const { getRootProps, getInputProps, isDragReject, isDragAccept } = useDropzone({ onDrop, multiple: false, accept })

    return (
        <div className='p-4 w-full'>
            <div {...getRootProps()} className='h-80 w-full rounded-md cursor-pointer focus:outline-none'>
                <input {...getInputProps()} />
                <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-full space-y-3
                        ${isDragReject ? "border-red-500" : ""}
                        ${isDragAccept ? "border-green-500" : ""}`}>
                    <img src={folder} alt="" className='w-16 h-16' />
                    {isDragReject ? <p>Only Supports images and pdf</p> : (
                        <>
                            <p>Drag and Drop Files</p>
                            <p>Only image and Pdf Files supported</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DropZone
