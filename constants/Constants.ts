import moment from "moment";
import { useWindowDimensions } from "react-native";

export const subjects = [
  {
    name: "Math",
    teacher: "Mr. Smith",
    room: "101",
    icon: "📚",
    color: "#0066ff",
  },
  {
    name: "English",
    teacher: "Mrs. Johnson",
    room: "102",
    icon: "📝",
    color: "#FEDC01",
  },
  {
    name: "History",
    teacher: "Mr. Brown",
    room: "103",
    icon: "🏛️",
    color: "#FE7273",
  },
  {
    name: "Science",
    teacher: "Mrs. Green",
    room: "104",
    icon: "🔬",
    color: "#faad99",
  },
  {
    name: "CS",
    teacher: "Mrs. Green",
    room: "104",
    icon: "💻",
    color: "#FEDCe1",
  },
  {
    name: "AI",
    teacher: "Mrs. Green",
    room: "104",
    icon: "🤖",
    color: "#F66C01",
  },
  {
    name: "ML",
    teacher: "Mrs. Green",
    room: "104",
    icon: "⚙️",
    color: "#53DC01",
  },
  {
    name: "Leisure",
    teacher: "Mrs. Green",
    room: "104",
    icon: "🍀",
    color: "#DC0199",
  },
  // Add more subjects as needed
];

export const daysOfWeek: { [key: string]: number } = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

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

// export const generateDailySchedule =
//   (schedule: any, w: number) => (schedule: any, dayIndex: number) => {
//     // console.log("🚀 ~ width:", width);

//     const events: {
//       icon: any;
//       title: string;
//       startDate: Date;
//       endDate: Date;
//       teacher: string;
//       room: string;
//       color: string;
//       indent?: number;
//       width?: number;
//     }[] = [];

//     const overlaps: any[] = [];

//     schedule.forEach((event: any) => {
//       const startTimeParts = event.startTime.split(":");
//       const endTimeParts = event.endTime.split(":");

//       const startDate = moment()
//         .startOf("day")
//         .add(dayIndex, "days")
//         .hours(parseInt(startTimeParts[0]))
//         .minutes(parseInt(startTimeParts[1]))
//         .toDate();

//       const endDate = moment()
//         .startOf("day")
//         .add(dayIndex, "days")
//         .hours(parseInt(endTimeParts[0]))
//         .minutes(parseInt(endTimeParts[1]))
//         .toDate();

//       // Find overlapping events
//       const overlappingEvents = overlaps.filter(
//         (overlap) => startDate < overlap.endDate && endDate > overlap.startDate
//       );
//       console.log("🚀 ~ schedule.forEach ~ overlaps:", overlaps)

//       // Calculate indent and width based on overlapping events
//       const numberOfOverlaps = overlappingEvents.length;
//       const width = (w - 120) / (numberOfOverlaps + 1); // Adjust as needed
//       const indent = (numberOfOverlaps * width) + 60; // Adjust as needed
//       console.log("🚀 ~ numberOfOverlaps:", numberOfOverlaps);
//       console.log("🚀 ~ indent:", indent);
//       console.log("🚀 ~ w:", w);
//       console.log("🚀 ~ width:", width);

//       overlappingEvents.forEach((overlap, index) => {
//         console.log("🚀 ~ numberOfOverlaps:", numberOfOverlaps);

//         overlap.indent = 60 + width * numberOfOverlaps;
//         overlap.width = width;
//       });

//       overlaps.push({ startDate, endDate, indent, width });

//       events.push({
//         icon: `${event.subject.icon}`,
//         title: `${event.subject.name}`,
//         color: event.subject.color,
//         startDate,
//         endDate,
//         teacher: event.subject.teacher,
//         room: event.subject.room,
//         indent,
//         width,
//       });
//     });

//     return events;
//   };

// export const generateDailySchedule = (schedule: any, containerWidth: number) => (daySchedule: any, dayIndex: number) => {
//   const events:any = [];
//   const overlaps:any = [];

//   daySchedule.forEach((event: any) => {
//     const startTimeParts = event.startTime.split(':');
//     const endTimeParts = event.endTime.split(':');

//     const startDate = moment().startOf('day').add(dayIndex, 'days')
//       .hours(parseInt(startTimeParts[0]))
//       .minutes(parseInt(startTimeParts[1]))
//       .toDate();

//     const endDate = moment().startOf('day').add(dayIndex, 'days')
//       .hours(parseInt(endTimeParts[0]))
//       .minutes(parseInt(endTimeParts[1]))
//       .toDate();

//     // Find overlapping events
//     const overlappingEvents = overlaps.filter((overlap: any) => startDate < overlap.endDate && endDate > overlap.startDate);

//     // Calculate width and indent based on overlapping events
//     const numberOfOverlaps = overlappingEvents.length;
//     const width = (containerWidth - 120) / (numberOfOverlaps + 1); // Adjust as needed
//     const indent = 60 + width * numberOfOverlaps; // Adjust as needed

//     // Update existing overlapping events' width
//     overlappingEvents.forEach((overlap: { width: number; }) => {
//       overlap.width = width;
//     });

//     overlaps.push({ startDate, endDate, indent, width });

//     events.push({
//       icon: `${event.subject.icon}`,
//       title: `${event.subject.name}`,
//       color: event.subject.color,
//       startDate,
//       endDate,
//       teacher: event.subject.teacher,
//       room: event.subject.room,
//       indent,
//       width,
//     });
//   });

//   return events;
// };
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
          name: string;
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
          title: `${event.subject.name}`,
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
