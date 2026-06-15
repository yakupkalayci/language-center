import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker';
import { tr } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('tr', tr);

function DateRangePicker(props) {

  const { date, onDateChange } = props;
  const [dateRange, setDateRange] = useState([date.from, date.to]);

  const normalizeStart = (d) => {
    const n = new Date(d);
    n.setHours(0, 0, 0, 0);
    return n;
  };
  const normalizeEnd = (d) => {
    const n = new Date(d);
    n.setHours(23, 59, 59, 999);
    return n;
  };

  const handleDateChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      const from = normalizeStart(update[0]);
      const to = normalizeEnd(update[1]);
      onDateChange({ from, to });
    }
  };

  return (
    <div>
      {/* <div onClick={() => setIsOpen(true)}>
        {dateRange[0] && dateRange[1]
          ? `${dateRange[0].toLocaleDateString("tr-TR")} - ${dateRange[1].toLocaleDateString("tr-TR")}`
          : "Tarih seç"}
      </div> */}
      <DatePicker
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={handleDateChange}
        locale={tr}
        dateFormat="dd MMM yyyy"
        maxDate={new Date()}
        monthsShown={2}
        isClearable={false}
        showPopperArrow={false}
      />
      <style jsx global>{`
                .react-datepicker {
                    font-family: inherit;
                    border-radius: 0.5rem;
                    border: 1px solid #e2e8f0;
                }
                .react-datepicker__header {
                    background-color: white;
                    border-bottom: 1px solid #e2e8f0;
                }
                .react-datepicker__day--selected,
                .react-datepicker__day--in-range {
                    background-color: #0284c7 !important;
                    color: white !important;
                }
                .react-datepicker__day--in-selecting-range {
                    background-color: rgba(2, 132, 199, 0.5) !important;
                }
                .react-datepicker__day:hover {
                    background-color: #e2e8f0 !important;
                }
                .react-datepicker-left {
                    left: -8px !important;
                }
                .react-datepicker-popper {
                  top: 8px;
                }
                .react-datepicker__month-container {
                  float: unset;
                }
                .react-datepicker__input-container input {
                  text-align: center;
                  padding: 8px;
                  border-radius: 8px;
                  width: 230px;
                  border: 1px solid black;
                  cursor: pointer;
                }
            `}</style>
    </div>
  )
}

export default DateRangePicker;