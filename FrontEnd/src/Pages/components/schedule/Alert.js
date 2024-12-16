import Swal from "sweetalert2";

export const modifileSuccess = () => {Swal.fire({
    icon: "success",
    title: "Thành công",
    text: "Đã cập nhật lịch khám thành công",
    confirmButtonColor: "#2e749a"
  })
};