import { toast, ToastOptions, ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

/** creates a cleaner interface for invoking toast functions and
 * adds the required bootstrap classes
 * @param {string} message - text to displayed in growl
 * @param {ToastOptions} options - customizations options
 */
export function growl(message: string, options: ToastOptions = {}) {
    let className = 'alert alert-';
    let progressClassName = '';
    switch (options.type) {
        case toast.TYPE.SUCCESS:
            className = `${className}success`;
            progressClassName = 'success-toast-progress';
            break;
        case toast.TYPE.INFO:
            className = `${className}info`;
            progressClassName = 'info-toast-progress';
            break;
        case toast.TYPE.WARNING:
            className = `${className}warning`;
            progressClassName = 'warning-toast-progress';
            break;
        case toast.TYPE.ERROR:
            className = `${className}danger`;
            progressClassName = 'danger-toast-progress';
            break;
        default:
            className = `${className}light`;
            progressClassName = 'light-toast-progress';
            break;
    }
    return toast(message, { ...options, className, progressClassName });
}
