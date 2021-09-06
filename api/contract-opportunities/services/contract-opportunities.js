'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {    
    async delete(ctx) {
        const today = Date.now();
        let expiredContracts = await strapi.query('contract-opportunities').find({contractExpiration_lte: today});
        
        console.log(expiredContracts[0].contractExpiration);
        
    }
};
