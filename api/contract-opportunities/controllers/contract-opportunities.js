'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async delete(ctx) {
        const contractId  =ctx.params.id;
        const today = Date.now();
        let expiredContracts = await strapi.query('contract-opportunities').find({contractExpiration_lte: today});
        console.log(expiredContracts[0].contractExpiration);
        // const entity = await strapi.services.restaurant.delete({ id });
        // return sanitizeEntity(entity, { model: strapi.models.restaurant });
      },
};
