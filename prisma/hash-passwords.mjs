import bcrypt from "bcrypt";

process.stdin.on("data", async (data) => {
  data
    .toString("utf-8")
    .split("\n")
    .forEach((l) => {
      const s = l.trim();
      if (s.length === 0) return;
      const hash = bcrypt.hashSync(s, 10);
      console.log(hash);
    });
});
