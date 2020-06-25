type StrNum = string | number;

export const formatDate = (stringDate: string): string => {
    const date = new Date(stringDate);
    let dd: StrNum = date.getDate();
    let mm: StrNum = date.getMonth() + 1;
    const yyy = date.getFullYear();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    return `${yyy}-${mm}-${dd}`;
};
