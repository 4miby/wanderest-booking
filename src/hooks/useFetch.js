import { useEffect, useState } from "react";
import axios from "axios";

// Định nghĩa hàm useFetch: đầu vào là url, đầu ra là dữ liệu sẽ lấy từ api
// BEGIN
const useFetch = (url) => {
  // State "data" để lưu trữ dữ liệu từ API
  const [data, setData] = useState([]);
  // State "loading" để theo dõi trạng thái loading của yêu cầu API
  const [loading, setLoading] = useState(false);
  // State "error" để theo dõi lỗi nếu có khi yêu cầu API
  const [error, setError] = useState(false);
  // Sử dụng useEffect để fetch data khi render page
  useEffect(() => {
    const fetchData = async () => {
      // Đặt trạng thái "loading" là true khi bắt đầu yêu cầu API
      setLoading(true);
      try {
        // Sử dụng thư viện axios để gọi API và lưu trữ dữ liệu vào state "data"
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        // Nếu có lỗi, đặt trạng thái "error" bằng lỗi đó
        setError(err);
      }
      // Đặt lại trạng thái loading là false sau khi yêu cầu API hoàn thành
      setLoading(false);
    };
    // Gọi hàm fetchData khi component được render lại hoặc khi giá trị của "url" thay đổi
    fetchData();
  }, [url]); // useEffect sẽ chạy lại khi giá trị của "url" thay đổi

  // Hàm thực hiện lại việc fetch data
  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  // Trả về một đối tượng chứa dữ liệu, trạng thái loading, lỗi và hàm reFetch
  return { data, loading, error, reFetch };
};
// END

export default useFetch;