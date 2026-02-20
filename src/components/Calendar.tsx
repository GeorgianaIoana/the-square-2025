import { useState } from "react";
import CalendlyButton from "./CalendlyButton";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const monthNames = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];

  const days = [];
  const daysBeforeMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  for (let i = 0; i < daysBeforeMonth; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const CONTACT_NOTE =
    "Te rugăm să iei legătura cu noi pentru a stabili ora ședinței.";

  type CalendarEvent = {
    id: number;
    name: string;
    startTime?: string | null;
    endTime?: string | null;
    location: string;
    note?: string;
  };

  const events: Record<string, CalendarEvent[]> = {
    monday: [
      {
        id: 1,
        name: "Lecții individuale pentru copii",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
      {
        id: 2,
        name: "Lecții individuale pentru adulți",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
    ],

    tuesday: [
      {
        id: 1,
        name: "Grupă adulți începători",
        startTime: "18:00",
        endTime: "19:00",
        location: "Corbeni 34, sector 2",
      },
      {
        id: 2,
        name: "Lecții individuale pentru copii",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
      {
        id: 3,
        name: "Lecții individuale pentru adulți",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
    ],

    wednesday: [
      {
        id: 1,
        name: "Grupă adulți online (Google Meet)",
        startTime: "19:00",
        endTime: "20:20",
        location: "Google Meet",
      },
      {
        id: 2,
        name: "Lecții individuale pentru copii",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
      {
        id: 3,
        name: "Lecții individuale pentru adulți",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
    ],

    thursday: [
      {
        id: 1,
        name: "Centrul de excelență pentru copii cu Vajda Levente",
        startTime: "16:30",
        endTime: "17:30",
        location: "Corbeni 34, sector 2",
      },
      {
        id: 2,
        name: "Grupă adulți",
        startTime: "18:30",
        endTime: "19:50",
        location: "Corbeni 34, sector 2",
      },
      {
        id: 3,
        name: "Grupă adulți",
        startTime: "20:00",
        endTime: "21:20",
        location: "Corbeni 34, sector 2",
      },
      {
        id: 4,
        name: "Lecții individuale pentru copii",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
      {
        id: 5,
        name: "Lecții individuale pentru adulți",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
    ],

    friday: [
      {
        id: 1,
        name: "Centrul de excelență pentru copii cu Vajda Levente",
        startTime: "18:00",
        endTime: "19:30",
        location: "Corbeni 34, sector 2",
      },
      {
        id: 2,
        name: "Lecții individuale pentru copii",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
      {
        id: 3,
        name: "Lecții individuale pentru adulți",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
    ],

    saturday: [
      {
        id: 1,
        name: "Te invităm să urmărești evenimentele și competițiile noastre pe pagina de Instagram / Facebook",
        startTime: "15:00",
        endTime: "18:00",
        location: "Stamina Workspace, Constantin Mille 18",
      },
      {
        id: 2,
        name: "Lecții individuale pentru copii",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
      {
        id: 3,
        name: "Lecții individuale pentru adulți",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
    ],

    sunday: [
      {
        id: 1,
        name: "Te invităm să urmărești evenimentele și competițiile noastre pe pagina de Instagram / Facebook",
        startTime: "15:00",
        endTime: "18:00",
        location: "Stamina Workspace, Constantin Mille 18",
      },
      {
        id: 2,
        name: "Lecții individuale pentru adulți",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
      {
        id: 3,
        name: "Lecții individuale pentru copii cu Vajda Levente",
        startTime: null,
        location: "Corbeni 34, sector 2 sau Google Meet",
        note: CONTACT_NOTE,
      },
    ],
  };

  const getDayKey = (day: number | undefined) => {
    if (!day) return "";

    if (events[day.toString() as keyof typeof events]) {
      return day.toString();
    }

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dayOfWeek = date.getDay();
    switch (dayOfWeek) {
      case 1:
        return "monday";
      case 2:
        return "tuesday";
      case 4:
        return "thursday";
      case 5:
        return "friday";
      case 6:
        return "saturday";
      default:
        return "sunday";
    }
  };

  const renderEventsForDay = (day: number) => {
    const dayKey = getDayKey(day);
    const dayEvents = events[dayKey as keyof typeof events] || [];
    return (
      <ol className="space-y-6">
        {dayEvents.map((event) => (
          <li
            key={event.id}
            className="group flex items-center gap-6 rounded-xl p-5 transition-colors duration-200 hover:bg-[#233d36]/20"
          >
            <div className="flex-auto">
              <p className="sm:text-[18px] text-[16px] text-[#a6b6e0] font-medium">
                {event.name}
              </p>
              <p className="mt-1 text-[#badad5] sm:text-[18px] text-[16px]">
                {event.startTime ? (
                  event.endTime ? (
                    <>
                      <time>{event.startTime}</time> - <time>{event.endTime}</time>
                    </>
                  ) : (
                    <time>{event.startTime}</time>
                  )
                ) : null}
                {event.note && (
                  <>
                    {event.startTime ? <br /> : null}
                    <span>{event.note}</span>
                  </>
                )}
                <br />
                <span className="text-sm text-[#7ca6a0] italic sm:text-[18px] text-sm">
                  {event.location}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="w-full border-[#233d36] border-t-[1px]">
      <div className="sm:container mx-auto">
        <div className="grid grid-cols-12 gap-6 px-4 sm:px-0 mt-[90px] mb-[90px] sm:mt-[75px] sm:mb-[75px]">
          <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:items-center relative mb-10 lg:mb-0 order-first lg:order-last">
            <h2 className="px-4 max-w-[270px] sm:max-w-[500px] sm:px-0 text-2xl font-semibold text-[#a6b6e0] mb-6 sm:mb-10 font-archivo">
              Programul pentru{" "}
              <time dateTime={selectedDate.toISOString()}>
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </h2>
            <div className="w-full">
              {renderEventsForDay(selectedDate.getDate())}
            </div>

            {/* Calendly CTA */}
            <div className="w-full mt-10 pt-8 border-t border-[#233d36]">
              <CalendlyButton variant="primary" size="md" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col items-start relative lg:pl-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-[#a6b6e0] font-archivo tracking-wide">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="p-3 rounded-full text-[#a6b6e0] hover:bg-[#233d36] transition-colors duration-200 font-semibold"
                >
                  <span className="sr-only">Previous month</span>
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-3 rounded-full text-[#a6b6e0] hover:bg-[#233d36] transition-colors duration-200 font-semibold"
                >
                  <span className="sr-only">Next month</span>
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-5 sm:gap-8 mb-4">
              {["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"].map((day) => (
                <div
                  key={day}
                  className="text-center text-base sm:text-lg font-medium text-[#a6b6e0] py-2 sm:py-3"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-3 bg-[#233d36]/10 rounded-lg overflow-hidden">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`relative bg-[#001a00] p-3 sm:p-4 ${
                    day ? "hover:bg-[#233d36]/20" : ""
                  }`}
                >
                  {day && (
                    <button
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            day
                          )
                        )
                      }
                      className={`w-full h-full flex items-center justify-center rounded-full aspect-square text-lg sm:text-xl font-archivo tracking-wide font-semibold ${
                        isToday(day)
                          ? "bg-[#a6b6e0] text-[#001a00]"
                          : isSelected(day)
                          ? "bg-[#233d36] text-white"
                          : "text-[#a6b6e0] hover:bg-[#233d36] hover:text-white"
                      }`}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
