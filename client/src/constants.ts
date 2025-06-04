let baseUrl: string = "http://localhost:3000/api/v1";

if (import.meta.env.MODE === "production") {
  baseUrl = "https://devconnector-j917.onrender.com/api/v1";
}

export { baseUrl };
