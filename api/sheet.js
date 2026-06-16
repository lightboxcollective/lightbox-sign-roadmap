module.exports = async (req, res) => {
  const ID = "11v0xeF4URa_yxYr3guluYZznrUIuMMz20Iz7YhoYHZg";
  const gviz = "https://docs.google.com/spreadsheets/d/" + ID + "/gviz/tq?tqx=out:csv";
  const exp = "https://docs.google.com/spreadsheets/d/" + ID + "/export?format=csv";
  try {
    let r = await fetch(gviz, { redirect: "follow" });
    if (!r.ok) { r = await fetch(exp, { redirect: "follow" }); }
    if (!r.ok) { res.status(502).send("upstream " + r.status); return; }
    const text = await r.text();
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(text);
  } catch (e) {
    res.status(502).send("error: " + (e && e.message));
  }
};
