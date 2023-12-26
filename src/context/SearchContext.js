import { createContext, useReducer } from "react";

// Định nghĩa một initial_state cho Context, bao gồm city, dates, và options
const INITIAL_STATE = {
  city: undefined, // Thành phố tìm kiếm (mặc định là undefined)
  dates: [], // Mảng chứa các ngày tìm kiếm (mặc định là một mảng trống)
  options: {
    adult: undefined, // Số lượng người lớn (mặc định là undefined)
    children: undefined, // Số lượng trẻ em (mặc định là undefined)
    room: undefined, // Số lượng phòng (mặc định là undefined)
  },
};

// Tạo ra một Context với initial_state
export const SearchContext = createContext(INITIAL_STATE);

// Sử dụng Reducer để thực hiện các thay đổi trạng thái với INITIAL_STATE
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH": // Thay đổi trạng thái theo thông tin tìm kiếm mới
      return action.payload;
    case "RESET_SEARCH": // Đặt lại trạng thái về giá trị khởi tạo
      return INITIAL_STATE;
    default:
      return state; // Trả về trạng thái hiện tại nếu không có hành động nào khớp
  }
};

// Component SearchContextProvider sử dụng Context và Reducer để quản lý trạng thái tìm kiếm
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  // Trả về Provider với giá trị bao gồm city, dates, options và dispatch để truyền xuống các component con
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};