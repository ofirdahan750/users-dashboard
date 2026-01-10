export const formatEmail = (email: string): string => {
  return email.toLowerCase().trim(); // return email in lowercase and trimmed
};

export const formatUrl = (url: string): string => {
  const trimmed = url.trim(); // trim url

  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`; // return url with https:// if it doesn't start with http:// or https://
  }

  return trimmed;
};
