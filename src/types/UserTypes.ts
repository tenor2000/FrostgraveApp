export type User = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  lastLogin: string;
  role: string;
  created: string;
  last_modified: string;
  profile: {
    bio: string;
    location: string;
    avatar: string;
  };
};

export type UserCreation = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};
