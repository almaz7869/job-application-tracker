# Pathway — Job Application Tracker

A React frontend and Spring Boot API for tracking applications and analyzing resume/job-description fit.

## Stack
React 19 + Vite; Java 17 + Spring Boot; Spring Security/JWT; Spring Data JPA; MySQL; Spring AI; Apache Tika; Docker Compose.

## Local setup
Copy `.env.example` to `.env`, set database and login values, and add `AI_API_KEY` for live model analysis. Run `docker compose up --build`, then open `http://localhost:5173`. The API health endpoint is `http://localhost:8080/api/health`.

## Hosted demo
The GitHub Pages site is a frontend demo using sample data and browser-local state. It does not call the deployed Spring API yet. For full AI analysis, deploy the API from this repository to Render, provide a MySQL database and private `AI_API_KEY`, then set the frontend's `VITE_API_BASE_URL` and rebuild Pages.
