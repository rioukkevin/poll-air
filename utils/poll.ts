interface ICreatePoll {
  name: string;
  choices: string[];
}

export const createPoll = async (variable: ICreatePoll) => {
  try {
    console.log("VAR", variable);
    const req = await fetch("/api/poll/create", {
      method: "POST",
      body: JSON.stringify(variable),
    });
    const json = await req.json();
    return json;
  } catch (error) {
    console.log("error", error);
  }
};
