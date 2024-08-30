export interface Reserve {
  id?: string;
  userId: string;
  roomId: string;
  hotelId: string;
  date: Date;
  status: string;
  active: boolean;
}
