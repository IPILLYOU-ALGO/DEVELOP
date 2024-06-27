"use client"

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function AiResultsCard(props) {
    const pays = props.data['drug_price'];
    const images = props.data['drug_img_path'];

    return (
        <div className="w-full max-w-sm bg-[#f2f2e8] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-2 pt-2">
                <img className="w-14 h-14 mb-3 rounded-full shadow-lg" src={images} alt="알약"/>
                <div className='flex text-xs items-center'>
                    <AttachMoneyIcon className='text-xs text-slate-700 w-3 h-3' /> 1정 <span className="text-xs">{pays}</span>원
                </div>
            </div>
        </div>
    )
}