import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';

const DateRangePicker = ({ onChange }) => {
  const pickerRef = useRef();

  useEffect(() => {
    $(pickerRef.current).daterangepicker(
      {
        locale: { format: 'DD MMMM YYYY' },
      },
      function (start, end) {
        onChange(start.format('DD MMMM YYYY'), end.format('DD MMMM YYYY'));
      }
    );
  }, [onChange]);

  return (
    <input type="text" ref={pickerRef} />
  );
};

export default DateRangePicker;
