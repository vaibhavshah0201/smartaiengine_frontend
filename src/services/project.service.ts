import { BehaviorSubject } from "rxjs";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

const baseUrl = `http://localhost:8000`;
const userSubject: any = new BehaviorSubject(
  typeof window !== "undefined" && localStorage.getItem("user")
);

export const projectService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  addProject,
  getProjectDetails,
  getRuleDetails,
  getFileDetails,
  getAllProjects,
  addRule,
  getRulesByProject,
  getFilesByProject,
  editProject,
  editRule,
  editFile,
};

async function addProject(payload: any) {
  const result = await fetchWrapper.post(
    `${baseUrl}/project/add`,
    payload,
    true
  );
  return result;
}

async function getProjectDetails(id: number) {
  const result = await fetchWrapper.get(
    `${baseUrl}/project/${id}/details`,
    {},
    true
  );
  return result;
}

async function getRuleDetails(id: number) {
  const result = await fetchWrapper.get(
    `${baseUrl}/rule/${id}/details`,
    {},
    true
  );
  return result;
}

async function getFileDetails(id: number) {
  const result = await fetchWrapper.get(
    `${baseUrl}/file/${id}/details`,
    {},
    true
  );
  return result;
}

async function getAllProjects() {
  const result = await fetchWrapper.get(`${baseUrl}/projects`, {}, true);
  return result;
}

async function addRule(data: any) {
  const result = await fetchWrapper.post(`${baseUrl}/rules/add`, data, true);
  return result;
}

async function getRulesByProject(id: any) {
  const result = await fetchWrapper.get(`${baseUrl}/rules/${id}`, null, true);
  return result;
}

async function getFilesByProject(id: any) {
  const result = await fetchWrapper.get(`${baseUrl}/files/${id}`, null, true);
  return result;
}

async function editProject(id: number, payload: any) {
  const result = await fetchWrapper.put(
    `${baseUrl}/project/${id}/edit`,
    payload,
    true
  );
  return result;
}
async function editRule(id: number, payload: any) {
  const result = await fetchWrapper.put(
    `${baseUrl}/rule/${id}/edit`,
    payload,
    true
  );
  return result;
}
async function editFile(id: number, payload: any) {
  const result = await fetchWrapper.put(
    `${baseUrl}/file/${id}/edit`,
    payload,
    true
  );
  return result;
}
