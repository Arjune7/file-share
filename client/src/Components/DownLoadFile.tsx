import copyPic from '../assets/copy.png'

const DownLoadFile = ({downloadPageLink}:any) => {
  return (
    <div className='p-1'>
      <h1 className='my-2 text-lg font-medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora 
        repellat odit! Enim ducimus hic reiciendis? Eligendi, in nam!</h1>
        <div className='flex space-x-3'>
            <span className='break-all'>{downloadPageLink}</span>
            <img src={copyPic} alt="" className='w-8 h-8 object-contain cursor-pointer' onClick={()=>navigator.clipboard.writeText(downloadPageLink)}/>
        </div>
    </div>
  )
}

export default DownLoadFile
