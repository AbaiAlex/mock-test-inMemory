export interface User {
  id: number;
  firstName: string;
  lastName: string;
  nationality: NationalityList[];
  momsName: string;
  country?: string;
  registered?: boolean;
  gender?: 'Female' | 'Male' ;
  dateOfBirth?: any;
  number?: number;
  status?: 'Done' |'New'| 'In process';
}

export interface NationalityList {
  name: string;
}


export interface CountryList {
  name: string;
}


export interface GenderList {
  label: string;
  value: string;
}

export interface StatusList {
  status: string;
}
