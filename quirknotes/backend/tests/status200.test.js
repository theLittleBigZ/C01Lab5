test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://127.0.0.1:4000";

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const res = await fetch(`${SERVER_URL}/getAllNotes`);
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.response.length).toBe(0);
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/deleteAllNotes - Delete one note", async () => {
  // Assuming that one note has been added
  const res = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.response).toBe("1 note(s) deleted.");
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: 'test',
      content: 'Hello World',
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: 'test',
      content: 'Hello World',
    }),
  });
  const postNoteBody2 = await postNoteRes2.json();
  const noteId2 = postNoteBody.insertedId;

  const res = await fetch(`${SERVER_URL}/getAllNotes`);
  const body = await res.json();
  console.log(body);
  expect(res.status).toBe(200);
  expect(body.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  // Assuming that the noteId is the ID of an existing note
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: 'test',
      content: 'Hello World',
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;
  const res = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, { method: "DELETE" });
  expect(res.status).toBe(200);
});

test("/patchNote - Patch with content and title", async () => {

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: 'test',
      content: 'Hello World',
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const title = "NewTitle";
  const content = "NewContent";
  const res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  expect(res.status).toBe(200);
});

test("/patchNote - Patch with just title", async () => {

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: 'test',
      content: 'Hello World',
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const title = "NewTitle";
  const res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
    }),
  });
  expect(res.status).toBe(200);
});

test("/patchNote - Patch with just content", async () => {

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: 'test',
      content: 'Hello World',
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const content = "NewContent";
  const res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
    }),
  });
  expect(res.status).toBe(200);
});

test("/deleteAllNotes - Delete more then 1 notes", async () => {
  // Assuming that three notes have been added
  const res = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.response).toBe("5 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: 'test',
      content: 'Hello World',
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const color = "#FF0000";
  const res = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: color,
    }),
  });
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.message).toBe("Note color updated successfully.");
  const reset = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
});