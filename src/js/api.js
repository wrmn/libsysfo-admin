const serverUrl = import.meta.env.VITE_SERVER_ADDRESS;
import { f7 } from "framework7-svelte";
import { get } from "svelte/store";
import { feedbackData, librariesData, notLogin, thirdPartyData } from "./store";

const postWithoutAuth = async (data, path) => {
  const request = new Request(`${serverUrl}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetch(request).catch(handleError);
  return response.json();
};

const headerGenerate = () => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("account-credential")}`
  );
  return myHeaders;
};

const postWithAuth = async (data, path, password) => {
  const myHeaders = headerGenerate();

  if (password != undefined) {
    myHeaders.append("Account-auth", password);
  }

  const request = new Request(`${serverUrl}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: myHeaders,
  });
  const response = await fetch(request).catch(handleError);
  return response.json();
};

export const getWithoutAuth = async (path) => {
  const response = await fetch(`${serverUrl}${path}`).catch(handleError);
  return response.json();
};

const getWithAuth = async (path) => {
  if (localStorage.getItem("account-credential")) {
    const myHeaders = headerGenerate();
    const request = new Request(`${serverUrl}${path}`, {
      method: "GET",
      headers: myHeaders,
    });
    const response = await fetch(request).catch(handleError);
    return response.json();
  }
};

export const getWithAuths = async (path) => {
  if (localStorage.getItem("account-credential")) {
    const myHeaders = headerGenerate();
    const request = new Request(`${path}`, {
      method: "GET",
      headers: myHeaders,
    });
    const response = await fetch(request).catch(handleError);
    return response.json();
  }
};

export const login = async (body) => {
  f7.dialog.preloader();
  const msg = await postWithoutAuth(body, `/login`);
  if (msg.status != 200) {
    f7.dialog.close();
    f7.dialog.alert(msg.description, "Login Failed");
  } else {
    f7.dialog.close();
    localStorage.setItem("account-credential", msg.data.token);
    notLogin.set(false);
    f7.loginScreen.close();
    getData();
  }
};

export const getData = async () => {
  feedbackData.set(await getWithAuth(`/feedback`));
  thirdPartyData.set(await getWithAuth(`/third-party`));
  if (get(feedbackData).status == 401) {
    f7.dialog.alert(
      get(feedbackData).description
        ? get(feedbackData).description
        : "server timeout",
      "user logged out",
      () => {
        localStorage.removeItem("account-credential");
        window.location.reload();
      }
    );
  }
};

export const getLibrary = async () => {
  librariesData.set(await getWithoutAuth(`/library`));
};

export const postLibrary = async (body) =>
  await postWithAuth(body, `/library/new`);

const handleError = (err) => {
  console.warn(err);
  f7.dialog.close();
  f7.dialog.alert("server timeout", "");
};
