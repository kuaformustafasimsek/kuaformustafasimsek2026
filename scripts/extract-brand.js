const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const match = html.match(/<svg class="logo-svg"[\s\S]*?<\/svg>/);
if (!match) {
  console.error("logo svg not found");
  process.exit(1);
}

let svg = match[0]
  .replace('class="logo-svg"', 'role="img" aria-label="Kuaför Mustafa Şimşek"')
  .replace('class="svg-elem-1"', 'fill="#CF0F47" fill-opacity="1"');
if (!svg.includes("xmlns=")) {
  svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
}

fs.mkdirSync(path.join(root, "assets", "img"), { recursive: true });
fs.writeFileSync(path.join(root, "assets", "img", "logo.svg"), svg, "utf8");
console.log("logo bytes", Buffer.byteLength(svg));

const raw = fs.readFileSync("C:/Users/emre_/OneDrive/Desktop/ikons.txt", "utf8");
const names = [
  ["whatsapp", "icon-whatsapp.svg"],
  ["instagram", "icon-instagram.svg"],
  ["Youtube", "icon-youtube.svg"],
  ["phone", "icon-phone.svg"],
  ["Randevu", "icon-randevu.svg"],
  ["Location", "icon-location.svg"],
  ["mail", "icon-mail.svg"],
  ["work time", "icon-time.svg"]
];

const outDir = path.join(root, "assets", "icons");
fs.mkdirSync(outDir, { recursive: true });

for (const [label, file] of names) {
  const re = new RegExp(
    label.replace(/ /g, "\\s+") + "\\s*(?:<\\?xml[^>]*\\?>)?\\s*(<svg[\\s\\S]*?</svg>)",
    "i"
  );
  const hit = raw.match(re);
  if (!hit) {
    console.error("missing", label);
    continue;
  }
  const icon = hit[1]
    .replace(/fill="#111B21"/g, 'fill="#FF0B55"')
    .replace("<svg", '<svg fill="#FF0B55"');
  fs.writeFileSync(path.join(outDir, file), icon, "utf8");
  console.log("wrote", file, Buffer.byteLength(icon));
}
