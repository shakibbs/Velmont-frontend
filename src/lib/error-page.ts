export interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: number;
}

export function createErrorPageData(
  code: number,
  title: string,
  message: string
): ErrorPageProps {
  return { code, title, message };
}

export const ERROR_PAGES = {
  notFound: createErrorPageData(404, "Page Not Found", "The page you are looking for does not exist."),
  serverError: createErrorPageData(500, "Server Error", "Something went wrong on our end. Please try again later."),
  unauthorized: createErrorPageData(401, "Unauthorized", "You need to be logged in to access this page."),
  forbidden: createErrorPageData(403, "Forbidden", "You do not have permission to access this page."),
} as const;
