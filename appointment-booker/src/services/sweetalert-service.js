import Swal from 'sweetalert2'

export const info = (text) => {
    Swal.fire(text);
}

export const success = (title, text) => {
    Swal.fire(title, text, 'success')
}

export const error = (title, text) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
    })
}

export const confirm = (title, text, confirmButtonText, CancelButtonText) => {
    return Swal.fire({
        title: title,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: CancelButtonText
    })
}
