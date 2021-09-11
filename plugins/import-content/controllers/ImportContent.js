'use strict';
/** * ImportContent.js controller
 * * @description: A set of functions called "actions" of the `import-content` plugin. */

module.exports = {
  preAnalyzeImportFile: async (ctx) => {
    const services = strapi.plugins["import-content"].services;
    try {
      const data = await services["importcontent"].preAnalyzeImportFile(ctx);
      ctx.send(data);
    } catch (error) {
      console.log(error);
      ctx.response.status = 406;
      ctx.response.message = "could not parse: " + error;
    }
  },
};
