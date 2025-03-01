
import Link from "next/link";

export default function IncHeader3(props) {
    const urls = props.urls;
    const pos = props.pos;

    return (
        <div className="flex justify-between items-center">
            <div className="w-full h-[72px] p-2.5">
                <Link href={urls}>
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0 w-6 h-6 absolute left-4 top-6"
                preserveAspectRatio="none"
                >
                <path
                    d="M9.27402 12.0006L16.2841 4.99053C16.4793 4.79527 16.4793 4.47868 16.2841 4.28342L15.7184 3.71774C15.5231 3.52247 15.2065 3.52247 15.0113 3.71774L7.08199 11.647C6.88673 11.8423 6.88673 12.1589 7.08199 12.3541L15.0113 20.2834C15.2065 20.4787 15.5231 20.4787 15.7184 20.2834L16.2841 19.7177C16.4793 19.5225 16.4793 19.2059 16.2841 19.0106L9.27402 12.0006Z"
                    fill="#1F2937"
                ></path>
                </svg>
                </Link>
            </div>
            <div className="flex mr-3">
                <button className={
                    pos == 1 ?
                    "w-6 h-6 text-center text-white bg-sky-700 rounded-full"
                    :
                    "w-6 h-6 text-center text-white bg-gray-200 rounded-full"
                    }
                    >1</button>
                <hr className="w-3 mt-3 text-cyan-500" />
                <button className={
                    pos == 2 ?
                    "w-6 h-6 text-center text-white bg-sky-700 rounded-full"
                    :
                    "w-6 h-6 text-center text-white bg-gray-200 rounded-full"
                    }>2</button>
            </div>
        </div>
    )
}