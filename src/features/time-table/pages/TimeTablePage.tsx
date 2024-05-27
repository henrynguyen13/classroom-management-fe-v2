import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { timeTableService } from "../services/time-table.service";
const localizer = dayjsLocalizer(dayjs);
// dayjs.locale("vn");
export const TimeTablePage = () => {
  const [eventsData, setEventsData] = useState([]);

  const getTimeTable = async () => {
    const response = await timeTableService.findAll();
    console.log("---response", response);
    const transformedData = response?.data.map((event: any) => ({
      ...event,
      start: new Date(event.start), // Converts string to Date object
      end: new Date(event.end), // Converts string to Date object
    }));

    setEventsData(transformedData);
  };

  useEffect(() => {
    getTimeTable();
  }, []);

  //   const handleSelect = ({ start, end }: any) => {
  //     console.log(start);
  //     console.log("typeOfStart", typeof start);
  //     console.log(end);
  //     const title = window.prompt("New Event name");
  //     if (title)
  //       setEventsData([
  //         ...eventsData,
  //         {
  //           start,
  //           end,
  //           title,
  //         },
  //       ]);
  //   };
  return (
    <div>
      <div className="font-medium text-2xl mb-5 text-center">
        Thời khóa biểu
      </div>
      <Calendar
        localizer={localizer}
        selectable
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        startAccessor="start"
        endAccessor="end"
        // onSelectEvent={(event) => alert(event.title)}
        // onSelectSlot={handleSelect}
        style={{ height: 500 }}
      />
    </div>
  );
};
