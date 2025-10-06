// src/services/courseService.js
import axiosInstance from "./axiosInstance";

export function getAllCourses(pageNumber = 1, pageSize = 6) {
  return axiosInstance.get(`/api/Courses/all?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export function filterCourses(params) {
  const query = new URLSearchParams(params).toString();
  return axiosInstance.get(`/api/Courses/Filter?${query}`);
}
