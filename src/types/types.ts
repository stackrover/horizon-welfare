// news card props
export type NewsCardProps = {
  title: string;
  date: string;
  description: string;
  image: string;
};

// story card props
export type StoryCardProps = {
  title?: string;
  subtext?: string;
  link?: string;
  className?: string;
  image?: string;
};

// about card props
export type AboutCardProps = {
  title: string;
  desc: string;
  imageUrl: string;
};

// award card props
export type AwardCardProps = {
  imageUrl: string;
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

// event card props
export type EventCardProps = {
  day: string;
  month: string;
  title: string;
  url: string;
  eventId: number;
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
  iconUrl: string;
  title: string;
  text: string;
};

// summary card props
export type SummaryCardProps = {
  imageUrl: string;
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

// donor profile nav item props
export type ProfileNavItemProps = {
  className?: string;
  children: React.ReactNode;
  path: string;
};

// subscription card props
export type SubscriptionCardProps = {
  projectId: number | string;
  imageUrl: string;
  buttonText: string;
  title: string;
  description: string;
  className?: string;
};

export type EventProps = {
  image: string;
  title: string;
  date: string;
  description: string;
  id: number;
};

export type VideoCardProps = {
  videoUrl: string;
  title: string;
};

export type TruncateStringProps = {
  children: string;
  length: number;
  separator?: string;
};

export type ProjectType = {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  thumbnail: string;
  goalAmount: string;
  collectionDays: number;
  totalCollections: string;
  volunteerNeed: number;
  isEmergency: number;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
};

// project manager type
export type ManagerType = {
  id: number;
  projectId: number;
  managerName: string;
  email: string;
  mobile: string;
  link: string;
  status: string;
  createdAt?: string;
};

// recent donation type
export type RecentDonationType = {
  uid: number;
  amount: string;
  fName: string;
};

export type StateType = {
  message: string | null;
  status?: string | null;
  error_type?: string | null;
};
