import { xml2js } from "xml-js";

export default function xml_reader(xml) {
  const xmlObject = xml2js(xml, { compact: true });

  // Extract relevant data from the XML object
  const title = xmlObject.rss.channel.title._text;
  const items = xmlObject.rss.channel.item;

  // Generate HTML
  const html = `
    <h1>${title}</h1>
    <ul>
      ${items
        .map((item) => {
          const itemTitle = item.title._cdata;
          const itemDescription = item.description._cdata;
          const itemLink = item.link._text;
          return `<li><a href="${itemLink}">${itemTitle}</a> ${itemDescription}</li>`;
        })
        .join("")}
    </ul>
    <script>console.log(${xmlObject})</script>
  `;
  return html;
}
