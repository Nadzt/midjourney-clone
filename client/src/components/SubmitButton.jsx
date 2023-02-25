import React from 'react'

const SubmitButton = ({ generatingImg, value, onClickHandler}) => {
  return (
    <button 
    type='button'
    onClick={onClickHandler}
    data-value={value}
    disabled={ generatingImg ? true : false }
    className='disabled:bg-gray-600 mt-3 text-white bg-[#4649ff] font-medium rounded-md text-sm w-full sm:w-1/12 px-5 py-2.5 text-center'
    >
        {value}
    </button>
  )
}

export default SubmitButton