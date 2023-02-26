import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RenderFile from './RenderFile';
import down from '../assets/down.png'
import fileDownload from 'js-file-download'

const Download = ({ }) => {
    let { id } = useParams();
    const [name, setName] = useState('')
    const [sizeInBytes, SetSizeInBytes] = useState(0)
    const [fileId, setFileId] = useState(null)
    const [format, setFormat] = useState('')

    const handleDownload = async() =>{
        const {data} = await axios.get(`http://localhost:3000/api/files/${id}/download` , {
            responseType : "blob"
        })

        fileDownload(data , name)
    }

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/files/${id}`);
            setName(response.data.name);
            SetSizeInBytes(response.data.sizeInBytes)
            setFileId(response.data.id)

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            {!id ? <span>File doesnt Exist</span> :
                <>
                    <div className='flex justify-center items-center flex-col bg-gray-800 py-3 rounded-md shadow-xl space-y-4'>

                        <img src={down} alt="" className='w-16 h-16' />
                        <h1 className='text-xl p-4'>Your File is ready to be Downloaded</h1>
                        <RenderFile file={{ name, format , sizeInBytes }} />
                        <button className='p-2 my-5 bg-gray-900 rounded-xl focus:outline-none' onClick={handleDownload}>Download</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Download