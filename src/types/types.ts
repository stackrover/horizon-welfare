// news card props
export type NewsCardProps = {
  title: string;
  date: string;
  description: string;
  image: string;
};

// story card props
export type StoryCardProps = {
  title: string;
  subtext: string;
  link: string;
  className?: string;
  image: string;
};

// about card props
export type AboutCardProps = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

// award card props
export type AwardCardProps = {
  icon: React.ReactNode;
  year: string;
  name: string;
  place: string;
};

// blog card props
export type BlogCardProps = {
  imageUrl: string;
  title: string;
  userImgUrl: string;
  userName: string;
  publishingDate: string;
};

// contact card props
export type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

// donation card props
export type DonationCardProps = {
  imageUrl: string;
  title: string;
  desc: string;
  collection: number;
  percentage: number;
};

// event card props
export type EventCardProps = {
  day: string;
  month: string;
  title: string;
  url: string;
};

// journey summary props
export type JourneySummaryProps = {
  count: string;
  text: string;
};

// project props
export type ProjectProps = {
  title: string;
  icon: React.ReactNode;
  link: string;
};

// project card props
export type ProjectCardProps = {
  title: string;
  description: string;
  path: string;
  className?: string;
};

// special need card props
export type SpecialNeedCardProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

// summary card props
export type SummaryCardProps = {
  icon: React.ReactNode;
  title: string | React.ReactNode;
  subTitle: string;
};

// single comment props
export type SingleCommentProps = {
  image: string;
  name: string;
  date: string;
  comment: string;
};
