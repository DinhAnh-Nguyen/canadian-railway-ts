export interface FeedbackData {
    id: number;
    name: string;
    date: string;
    message: string;
    views: number;
  }
  
  export const initialFeedbackData: FeedbackData[] = [
    {
      id: 1,
      name: "Tan Nguyen",
      date: "2/25/2025",
      message: "Great app! Very useful.",
      views: 100,
    },
    {
      id: 2,
      name: "John Doe",
      date: "2/20/2025",
      message: "Would love to see more features.",
      views: 75,
    },
    {
      id: 3,
      name: "Alice Smith",
      date: "2/15/2025",
      message: "The UI looks great!",
      views: 50,
    },
  ];
  