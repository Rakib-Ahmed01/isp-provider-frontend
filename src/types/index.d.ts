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
};

type Role = 'user' | 'admin' | 'super_admin';
