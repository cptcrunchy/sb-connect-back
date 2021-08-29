'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function find(){
    return "strapi"
};

async function create(ctx){
    // let samResponse = await fetch(`https://api.sam.gov/entity-information/v1/entities?api_key=r3cYNK8ZhHkddQ6mX6Km8PqZG8JBqKqhWWWyLmlL&cageCode=${ cageCode }`)
    // const { entityData } = await samResponse.json()
    // userInformation = {
    //     legalBusinessName: entityData[0].entityRegistration.legalBusinessName,
    //     duns: entityData[0].entityRegistration.ueiDUNS,
    //     cageCode: entityData[0].entityRegistration.cageCode,
    //     businessTypeList: entityData[0].coreData.businessTypes.businessTypeList,
    //     primaryNaics: entityData[0].assertions.goodsAndServices.primaryNaics, 
    //     naicsList: entityData[0].assertions.goodsAndServices.naicsList,
    //     entityURL: entityData[0].coreData.entityInformation.entityURL,
    //     samEmail: entityData[0].pointsOfContact.governmentBusinessPOC.email
    // }
    
    console.log(ctx.request.body.registeredEmail)
    // For DEV only 
    if(ctx.request.body.registeredEmail === "bp_ct2009@yahoo.com"){
        return {
            isRegistered: true,
            legalBusinessName: "Spatialgis, L.L.C",
            duns: "080446911",
            cageCode: "78209",
            businessTypeList: [1, 2, 3, 4],
            primaryNaics: "541370", 
            naicsList: [5, 6, 7, 8, 9],
            entityURL: "www.spatialgisservices.com",
            samEmail: "bp_ct2009@yahoo.com" 
        }
    }
    return {
        isRegistered: false
    }
}

module.exports = { find, create };
