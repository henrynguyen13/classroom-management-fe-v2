import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { timeTableService } from "../services/time-table.service";
import { closeLoading, openLoading, ScreenType, useBreakpoint } from "@/common";
import { useDispatch } from "react-redux";
const localizer = dayjsLocalizer(dayjs);
// dayjs.locale("vn");
export const TimeTablePage = () => {
  const [eventsData, setEventsData] = useState([]);
  const { isSm } = useBreakpoint(ScreenType.SM);
  const dispatch = useDispatch();
  const getTimeTable = async () => {
    dispatch(openLoading());

    try {
      const response = await timeTableService.findAll();
      if (response?.success) {
        const transformedData = response?.data.map((event: any) => ({
          ...event,
          start: new Date(event.start), // Converts string to Date object
          end: new Date(event.end), // Converts string to Date object
        }));

        setEventsData(transformedData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getTimeTable();
  }, []);

  return (
    <div>
      <div className="font-medium text-2xl mb-5 text-center">
        Thời khóa biểu
      </div>
      <Calendar
        localizer={localizer}
        selectable
        defaultDate={new Date()}
        defaultView={isSm ? "month" : "agenda"}
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
