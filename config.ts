/**
 * This file serves as the configuration for the project, where the URLs for both the backend and frontend services are defined.
 * There are separate URLs for testing (locally hosted) and production (hosted on specific servers).
 * 
 * To switch between test and production, simply uncomment the respective line and comment out the current one.
 * Do not change these values unless necessary, as it can affect the entire operation of the application.
 */

// URLs for backend service.

// Uncomment this line when testing the application locally.
// export const base_api_endpoint: string = "http://localhost:8000"; // LOCAL TESTING 🚧

// Uncomment this line when deploying the application for production usage.
export const base_api_endpoint: string = "https://api.jupyter.javisf.com";  // PRODUCTION 🔥


// URLs for frontend service.

// Uncomment this line when testing the application locally.
// export const base_frontend_endpoint: string = "http://localhost:3000";  // LOCAL TESTING 🚧

// Uncomment this line when deploying the application for production usage.
export const base_frontend_endpoint: string = "https://jupyter.javisf.com";  // PRODUCTION 🔥
