import React, { FunctionComponent } from 'react'
import { Ifile } from '../libs/types'
import filePic from '../assets/file.png'
import { sizeInMb } from '../utilities/convertor'

const RenderFile : FunctionComponent<{file : Ifile}> = ({file : {format , sizeInBytes , name}}) => {
  return (
    <div className='flex items-center w-full p-4 my-2'>
      <img src={filePic} alt="" className='w-14 h-14'/>
      <span className='mx-2'>{name}</span>
      <span className='ml-auto'>{sizeInMb(sizeInBytes)}</span>
    </div>
  )
}

export default RenderFile
