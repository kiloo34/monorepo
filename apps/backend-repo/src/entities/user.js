/**
 * @typedef {Object} User
 * @property {string} id - The unique identifier of the user.
 * @property {string} email - The email of the user.
 * @property {string} name - The name of the user.
 * @property {Date} createdAt - The date the user was created.
 * @property {Date} updatedAt - The date the user was last updated.
 */

/**
 * @typedef {Object} CreateUserDTO
 * @property {string} email - The email of the user to be created.
 * @property {string} name - The name of the user to be created.
 */

/**
 * @typedef {Object} UpdateUserDTO
 * @property {string} [name] - The optional name of the user to be updated.
 * @property {string} [email] - The optional email of the user to be updated.
 */

module.exports = {};
