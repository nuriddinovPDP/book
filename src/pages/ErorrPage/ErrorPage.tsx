import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <img src="./undraw_page_not_found_re_e9o6 1.svg" alt="" />
      <div className='mt-[30px] flex gap-[12px]'>
        <Link to={"/"} className='bg-[#6200EE] border-[2] pt-[10px] pb-[10px] pl-[60px] pr-[60px] font-[500] text-[16px] text-[#fff] rounded-[4px]'>Go Home Page</Link>
        <button onClick={()=> window.location.reload()} className='border-[2px] border-[#6200EE] pt-[10px] pb-[10px] pl-[60px] pr-[60px] font-[500] text-[16px] text-[#6200EE] rounded-[4px]'>Reload Page</button>


      </div>
    </div>
  )
}

export default ErrorPage
