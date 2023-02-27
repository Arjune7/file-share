import axios from 'axios'
import React, { FunctionComponent, useState } from 'react'

const EmailComponent: FunctionComponent<{ id: string | null }> = ({ id }) => {

    const [emailFrom, setEmailFrom] = useState('')
    const [emailTo, setEmailTo] = useState('')
    const [message, setMessage] = useState('')

    const handleEmail = async (e:any) => {
        e.preventDefault()
        try {
            const { data } = await axios({
                method: 'POST',
                url: "api/files/email",
                data: {
                    id, emailFrom, emailTo
                }
            })
            setMessage(data.message)
        } catch (error) {
            setMessage('Failed')
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full p-2 space-y-3'>
            <h3>You Can also send the file through mail</h3>
            <form className='flex flex-col items-center justify-center w-full p-2 space-y-3' onSubmit={handleEmail}>
                <input type="email" placeholder='Email From' required onChange={e => setEmailFrom(e.target.value)} value={emailFrom} className='p-1 text-white bg-gray-800 focus:outline-none border-2' />
                <input type="email" placeholder='Email To' required onChange={e => setEmailTo(e.target.value)} value={emailTo} className='p-1 text-white bg-gray-800 focus:outline-none border-2' />
                <button className='p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none'>Email</button>
            </form>
            {
                message && <p className='font-medium text-red-500'>{message}</p>
            }
        </div>
    )
}

export default EmailComponent
