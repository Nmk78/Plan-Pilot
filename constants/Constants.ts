import moment from "moment";
import tinycolor from "tinycolor2"




export const subjects = [
  {
    id: 1,
    title: "Math",
    teacher: "Mr. Smith",
    room: "101",
    icon: "📚",
    color: "#0066fa",
  },
  {
    id: 2,
    title: "English",
    teacher: "Mrs. Johnson",
    room: "102",
    icon: "📝",
    color: "#FEDC01",
  },
  {
    id: 3,
    title: "History",
    teacher: "Mr. Brown",
    room: "103",
    icon: "🏛️",
    color: "#FE7273",
  },
  {
    id: 4,
    title: "Science",
    teacher: "Mrs. Green",
    room: "104",
    icon: "🔬",
    color: "#faad99",
  },
  {
    id: 5,
    title: "CS",
    teacher: "Mrs. Green",
    room: "104",
    icon: "💻",
    color: "#FEDCe1",
  },
  {
    id: 6,
    title: "AI",
    teacher: "Mrs. Green",
    room: "104",
    icon: "🤖",
    color: "#F66C01",
  },
  {
    id: 7,
    title: "ML",
    teacher: "Mrs. Green",
    room: "104",
    icon: "⚙️",
    color: "#53DC01",
  },
  {
    id: 8,
    title: "Leisure",
    teacher: "Mrs. Green",
    room: "104",
    icon: "🍀",
    color: "#DC0199",
  },
];

export const weeklySchedule = {
  Monday: [
    { startTime: "09:00", endTime: "10:00", subject: subjects[0] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[1] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[6] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[3] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[5] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[2] },
  ],
  Tuesday: [
    { startTime: "09:00", endTime: "10:00", subject: subjects[2] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[0] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[5] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[4] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[6] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[3] },
  ],
  Wednesday: [
    { startTime: "09:00", endTime: "10:00", subject: subjects[2] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[3] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[3] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[0] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[0] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[3] },
  ],
  Thursday: [
    { startTime: "09:00", endTime: "10:00", subject: subjects[2] },
    { startTime: "10:00", endTime: "12:00", subject: subjects[3] },
    { startTime: "13:00", endTime: "14:00", subject: subjects[6] },
    { startTime: "14:00", endTime: "15:00", subject: subjects[4] },
    { startTime: "15:00", endTime: "16:00", subject: subjects[3] },
  ],
  Friday: [
    { startTime: "09:00", endTime: "10:00", subject: subjects[2] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[0] },
    { startTime: "11:00", endTime: "12:00", subject: subjects[1] },
    { startTime: "13:00", endTime: "14:00", subject: subjects[3] },
    { startTime: "14:00", endTime: "16:00", subject: subjects[6] },
  ],
  Saturday: [
    { startTime: "09:00", endTime: "10:00", subject: subjects[2] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[0] },
    { startTime: "11:00", endTime: "12:00", subject: subjects[1] },
    { startTime: "13:00", endTime: "15:00", subject: subjects[3] },
    { startTime: "15:00", endTime: "16:30", subject: subjects[5] },
    { startTime: "16:30", endTime: "18:00", subject: subjects[4] },
    { startTime: "17:00", endTime: "20:30", subject: subjects[1] },
    { startTime: "18:00", endTime: "21:30", subject: subjects[2] },
    { startTime: "18:00", endTime: "21:30", subject: subjects[3] },
  ],
  Sunday: [
    { startTime: "09:00", endTime: "10:00", subject: subjects[2] },
    { startTime: "10:00", endTime: "11:00", subject: subjects[0] },
    { startTime: "11:00", endTime: "12:00", subject: subjects[1] },
    { startTime: "13:00", endTime: "15:00", subject: subjects[3] },
    { startTime: "15:00", endTime: "16:30", subject: subjects[5] },
    { startTime: "16:30", endTime: "18:00", subject: subjects[4] },
    { startTime: "18:00", endTime: "20:30", subject: subjects[1] },
    { startTime: "18:00", endTime: "21:30", subject: subjects[3] },
  ],
};


export const daysOfWeek: { [key: string]: number } = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};



export const generateDailySchedule =
  (schedule: any) => (schedule: any, dayIndex: number) => {
    const events: {
      icon: any;
      title: string;
      startDate: Date;
      endDate: Date;
      teacher: string;
      room: string;
      color: string;
    }[] = [];

    schedule?.forEach(
      (event: {
        startTime: string;
        endTime: string;
        subject: {
          icon: any;
          title: string;
          teacher: string;
          room: string;
          color: string;
        };
      }) => {
        const startTimeParts = event.startTime.split(":");
        const endTimeParts = event.endTime.split(":");

        const startDate = moment()
          .startOf("day")
          .add(dayIndex, "days")
          .hours(parseInt(startTimeParts[0]))
          .minutes(parseInt(startTimeParts[1]))
          .toDate();

        const endDate = moment()
          .startOf("day")
          .add(dayIndex, "days")
          .hours(parseInt(endTimeParts[0]))
          .minutes(parseInt(endTimeParts[1]))
          .toDate();

        events.push({
          icon: `${event.subject.icon}`,
          title: `${event.subject.title}`,
          color: event.subject.color,
          startDate,
          endDate,
          teacher: event.subject.teacher,
          room: event.subject.room,
        });
      }
    );

    return events;
  };


// Function to get a contrasting accent color

export const getAccentColor = (color:any) => {
  const baseColor = tinycolor(color);
  const isLight = baseColor.isLight();

  // If the base color is light, darken it, and if it's dark, lighten it
  const accentColor = isLight ? baseColor.darken(15) : baseColor.lighten(15);

  // console.log(accentColor.toHexString())
  return accentColor.toHexString();
};

export const getComplementaryColor = (color: string): string => {
  const baseColor = tinycolor(color);
  const complementaryColor = baseColor.complement();

  return complementaryColor.toHexString();
};