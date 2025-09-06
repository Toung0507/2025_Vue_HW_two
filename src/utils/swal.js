import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const swalSuccess = (title, timer = 1000) => {
  Swal.fire({
    icon: 'success',
    title,
    timer,
    showConfirmButton: false,
  });
};

export const swalError = (title, timer = 2000) => {
  Swal.fire({
    icon: 'error',
    title,
    timer,
    showConfirmButton: false,
  });
};