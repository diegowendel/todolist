import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const DateInput = (props) => {
  const format = 'DD/MM/YYYY';
  return (
    <DayPickerInput
      formatDate={formatDate}
      format={format}
      parseDate={parseDate}
      placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
    />
  );
};

export default DateInput;
