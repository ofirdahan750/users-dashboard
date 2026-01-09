export const formatEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const formatUrl = (url: string): string => {
  const trimmed = url.trim();
  
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  
  return trimmed;
};
