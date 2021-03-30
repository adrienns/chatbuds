var url;
if (process.env.NODE_ENV == "development") {
  url = "http://localhost:9000";
} else {
  url = "";
}

export const API_URL = url;
