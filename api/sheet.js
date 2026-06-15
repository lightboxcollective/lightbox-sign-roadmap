module.exports = async (req, res) => {
  const ID = "1o9Uf2FJCmNzCK6WYJnfcbKIx61-TY8CHpiFQ_CDC_Yk";
  const url = "https://docs.google.com/spreadsheets/d/" + ID + "/export?format=csv";
  try {
    const r = await fetch(url, { redirect: "follow" });
    if (!r.ok) { res.status(502).send("upstream " + r.status); return; }
    const text = await r.text();
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    res.status(200).send(text);
  } catch (e) {
    res.status(502).send("error: " + (e && e.message));
  }
};
