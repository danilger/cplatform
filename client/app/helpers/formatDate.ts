import { format } from "date-fns";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy HH:mm");
};

export default formatDate;
