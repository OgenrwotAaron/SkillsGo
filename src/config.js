import moment from 'moment';

const CURRENT_YEAR=(new Date()).getFullYear();
const URL='http://localhost:3004';
const formatDate = (date)=>{
    return moment(date).format('DD-MM-YYYY');
}

export{
    CURRENT_YEAR,
    URL,
    formatDate
}