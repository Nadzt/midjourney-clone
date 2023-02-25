import React from "react"

const VariationButton = ({ value, onClickHandler, disabledCondition }) => {
    return(
        <button
        type='button'
        onClick={onClickHandler}
        disabled={ disabledCondition ? true : false }
        data-value={value}
        className='disabled:bg-gray-600 mt-3 text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-1/12 px-5 py-2.5 text-center'
        >
        {value}
        </button>
    )
}

export default VariationButton