export interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string | null;
  published_date: string;
  is_active: boolean;
}
