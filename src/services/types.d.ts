export interface IRestaurant {
  id: string;
  name: string;
  foodRating: number;
  serviceRating: number;
  vibeRating: number;
  menuItems: { id: number; name: string; wouldEatAgain: boolean | null }[];
  littleBlanket: boolean;
  notes: string | undefined;
}
