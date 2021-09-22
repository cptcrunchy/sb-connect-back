module.exports = {
    index: async ctx => {
        const params = ctx.request.body;

        // The identifier is required.
        if(!params.identifier){
            return ctx.badRequest(null, formatError({
                id: "Auth.form.error.email.provide",
                message: "Please provide your username or your e-mail."
                })
            );
        }

        // Otherwise assume
        const user = await strapi.query('user', 'users-permissions').findOne({username: params.identifier})
        // Validate given password against user query result password
        const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(params.password, user.password);

        if(!validPassword){
            return ctx.badRequest(
                null,
                formatError({
                   id: 'Auth.form.error.invalid',
                   message: 'Identifier or password invalid.',
                })
             );
        } else {
          // Generate new hash password
          const password = await strapi.plugins['users-permissions'].services.user.hashPassword({password: params.newPassword});
          // Update user password
          await strapi.query('user', 'users-permissions').update({ id: user.id }, { resetPasswordToken: null, password });

          // Return new jwt token
          ctx.send({jwt: strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id }),
                user: sanitizeEntity(user.toJSON ? user.toJSON() : user, { model: strapi.query('user', 'users-permissions').model }),
          });
        }
    }
}