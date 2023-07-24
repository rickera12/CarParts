import moment from 'moment';

export const formattedTimestamp = timestamp => moment(timestamp).format('YYYY-MM-DD');
