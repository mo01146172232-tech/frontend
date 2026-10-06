export interface IContact {
  _id: string;
  smallLabel: string;
  subHeading: string;
  introText: string;
  email: string;
  location: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}