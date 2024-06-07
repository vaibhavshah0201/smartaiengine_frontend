import { BehaviorSubject } from "rxjs";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

const baseUrl = `http://localhost:8000`;
const userSubject: any = new BehaviorSubject(
  typeof window !== "undefined" && localStorage.getItem("user")
);

export const chatPromptService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  addProject,
  getRuleDetails,
  editProject,
  askPrompt
};

async function askPrompt(prompt: number) {
  const result = await fetchWrapper.get(
    `${baseUrl}/ask?question=${prompt}`,
    {},
    false
  );
  console.log(result);
  
  return result;
}

async function addProject(payload: any) {
  const result = await fetchWrapper.post(
    `${baseUrl}/project/add`,
    payload,
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

async function editProject(id: number, payload: any) {
  const result = await fetchWrapper.put(
    `${baseUrl}/project/${id}/edit`,
    payload,
    true
  );
  return result;
}
