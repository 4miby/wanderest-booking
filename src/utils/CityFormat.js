export const CityFormat = (city)=>{
  switch(city) {
    case "HCM":
      return "Hồ Chí Minh"
    case "HaNoi":
      return "Hà Nội"
    case "DaNang":
      return "Đà Nẵng"
    case "DaLat":
      return "Đà Lạt"
    case "NhaTrang":
      return "Nha Trang"
    default:
      return city
  }
}