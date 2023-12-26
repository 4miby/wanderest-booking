import { createContext, useEffect, useReducer } from "react";
// Định nghĩa một initial_state cho Context, bao gồm user, loading, và error
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// Tạo ra một Context với initial_state
export const AuthContext = createContext(INITIAL_STATE);

// Sử dụng Reducer để thực hiện các thay đổi với initial_state
const AuthReducer = (state, action) => {
  switch (action.type) {
    // Đặt các giá trị là null khi bắt đầu quá trình đăng nhập
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, // Lưu trữ thông tin user khi đăng nhập thành công
        loading: false, // Đặt trạng thái loading là false
        error: null, // Đặt trạng thái lỗi là null
      };
    case "LOGIN_FAILURE":
      return {
        user: null, // Đặt user là null khi đăng nhập thất bại
        loading: false, // Đặt trạng thái loading là false
        error: action.payload, // Lưu trữ thông báo lỗi khi đăng nhập thất bại
      };
    case "LOGOUT":
      return {
        user: null, // Đặt user là null khi đăng xuất
        loading: false, // Đặt trạng thái loading là false
        error: null, // Đặt trạng thái lỗi là null
      };
    default:
      return state; // Trả về trạng thái hiện tại nếu không có hành động nào khớp
  }
};

// Component AuthContextProvider sử dụng Context và Reducer để quản lý trạng thái
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  // Sử dụng useEffect để lưu trữ thông tin user vào localStorage khi user thay đổi
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  // Trả về Provider với giá trị bao gồm user, loading, error, và dispatch để truyền xuống các component con
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};