// const path = require(`path`);

// // // Generate pages at compile time
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;
//   const template = path.resolve('./src/templates/default.js');
//   const result = await graphql(`
//     query {
//       allAirtable(filter: { table: { eq: "spark" } }) {
//         nodes {
//           id
//           data {
//             content
//           }
//         }
//       }
//     }
//   `);

//   const { allAirtable } = result.data;
//   const cards = allAirtable.nodes.map(item => ({
//     ...item,
//     component: template
//   }));

//   vines.forEach(page => {
//     createPage({
//       path: `/${page.slug}/`,
//       component: `${page.component}`,
//       context: {
//         id: `${page.id}`
//       }
//     });
//   });
// };
