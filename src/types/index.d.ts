type Plan = {
  id: string;
  title: string;
  description: string;
  price: number;
  isAvailable: boolean;
  speed: number;
  reviews: Review[];
};

type Review = {
  id: string;
  comment: string;
  rating: number;
  planId: string;
  userId: string;
  user: User;
  plan: Plan;
};

type Feedback = {
  id: string;
  subject: string;
  comment: string;
  userId: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  profileImg: string;
  isBanned: boolean;
};

type Order = {
  id: string;
  status: Status;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  plan: Plan;
};

type Faq = {
  id: string;
  question: string;
  answer: string;
};

type Blog = {
  id: string;
  title: string;
  content: string;
};

type Status = 'pending' | 'delivered' | 'canceled';

type Role = 'user' | 'admin' | 'super_admin';
