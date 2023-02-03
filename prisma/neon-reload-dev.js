require('dotenv').config();
const NEON_API_KEY=process.env.NEON_API_KEY ?? process.exit(1);
const NEON_PROJECT_ID=""; // starts with br-
const SERVER="https://console.neon.tech/api/v2";
const GET_POST_BRANCHES=`${SERVER}/projects/${NEON_PROJECT_ID}/branches`;
const MAIN_BRANCH="main";
const DEV_BRANCH="dev";


const headers = {
    "Accept": "application/json",
    "Authorization": `Bearer ${NEON_API_KEY}`,
    "Content-Type": "application/json",
};

const r1 = await fetch(GET_POST_BRANCHES, { method: "GET", headers }).then(res => res.json()).catch(() => {
    console.log("get request failed");
    process.exit(1);
});
console.log(r1);

const main_br_id = r1.branches.find(b => b.name === MAIN_BRANCH).id;
if (main_br_id === undefined ) {
    console.log("no main branch found");
    process.exit(1);
}
const dev_br_id = r1.branches.find(b => b.name === DEV_BRANCH).id;
if (dev_br_id !== undefined) {
    const r2 = await fetch(`${GET_POST_BRANCHES}/${dev_br_id}`, { method: "DELETE", headers }).then(res => res.json()).catch(() => {
        console.log("delete request failed");
        process.exit(1);
    });
    console.log(r2);
}

const body = `{
  "endpoints": [
    {
      "type": "read_write"
    }
  ],
  "branch": {
    "parent_id": "${main_br_id}",
    "name": "${DEV_BRANCH}"
  }
}`
const r3 = await fetch(GET_POST_BRANCHES, { method: "POST", headers, body }).then(res => res.json()).catch(() => {
    console.log("post request failed");
    process.exit(1);
});
console.log(r2);

const host = r3.endpoints.host;
console.log(`Created new branch "${DEV_BRANCH}" from ${MAIN_BRANCH} with endpoint: ${host}`);

