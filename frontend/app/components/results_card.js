////////////////////////////////////////
// 개발자 : 이승주(joo4123)
// 기간 : 2024.06.19-2024.06.25
// 구현기능 : axios delete 구현
////////////////////////////////////////
"use client"

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { useRouter } from 'next/router';
axios.defaults.baseURL = "http://211.216.177.2:15200";

export default function ResultsCard(props) {
    const flag = props.flag;
    const data = props.data;
    // const names = data.drug_price_amount > 0 ? data[0].drug_no : null;
    const names = props.data['drug_no'];
    const effect = props.data['drug_illness'];
    const images = props.data['drug_img_path'];
    const token = localStorage.getItem('token');
    // const router = useRouter();

    const handleDel = (names) => {
        Swal.fire({
            title: "삭제하기",
            text: names + "를 삭제하시겠습니까 ?",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소"
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(data)
                //
                    const fetchData = async () => {
                        try {
                          // POST 요청을 통해 서버에 로그인 정보 전송
                          console.log(token);
                          const response = await axios.delete(
                            '/app/drugs/analyze/results/',
                            {
                              params: {
                                drug_no : names,
                                token: token
                              },
                              headers: {
                                'Authorization': `Token <${token}>`
                              }
                            }
                          );
                          console.log(response.data.status_code);
                          console.log(response.data);
                        } catch (error) {
                          console.log(token);
                          Swal.fire({
                            title: "로딩 실패",
                            text: "오류 발생.",
                            icon: "error",
                          });
                        }
                      };
                      fetchData();
                location.href= "/analyze/results/"
            }
          });
    }

    return (
        <div className="w-full max-w-sm bg-[#f2f2e8] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
                {flag ? <HighlightOffIcon onClick={() => {handleDel(names)}} /> : "" }
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={images} alt="알약"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{names}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{effect}</span>
            </div>
        </div>
    )
}