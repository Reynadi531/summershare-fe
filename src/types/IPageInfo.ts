export default interface IPageInfo {
  limit: number;
  page: number;
  sort: string;
  more: boolean;
  total_rows: number;
  total_pages: number;
}
