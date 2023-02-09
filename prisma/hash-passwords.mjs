import bcrypt from "bcrypt";

process.stdin.on("data", async (data) => {
  data
    .toString("utf-8")
    .split("\n")
    .forEach(async (l) => {
      const s = l.trim();
      if (s.length === 0) return;
      const hash = await bcrypt.hash(s, 10);
      console.log(s, hash);
    });
});
