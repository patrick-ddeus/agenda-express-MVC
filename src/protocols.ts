export type SignBody = {
  email: string;
  password: string;
};

export type ContactBody = {
  name: string;
  lastName: string;
  email: string;
  tel: string;
};

export type UpdateContactBody = Partial<ContactBody>;
