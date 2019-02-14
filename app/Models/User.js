'use strict'

const Hash  = use('Hash');
const Model = use('Model');

class User extends Model {
  static boot () {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * The attributes that should be visible for arrays.
   *
   * @var array
   */
  static get visible () {
    return ['email', 'name', 'username', 'account_status', 'id'];
  }

  /**
   * A relationship.
   *
   * @method tokens
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User
