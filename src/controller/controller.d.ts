type StudentData = {
  firstName: string;
  lastName: string;
  currentPost: string;
  emailId: string;
  linkedIn: string;
  mobile: string;
  otherUrls: {
    name: string;
    url: string;
  }[];
};

type GoogleData = {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
};

type UserData = {
  isAdmin: boolean;
  googleToken?: string;
};

export { StudentData, GoogleData, UserData };
