'use strict'

const Hash  = use('Hash');
const Model = use('Model');

class User extends Model {
  // GANCHOS (hooks)
  // -------------------------------------------------------------------------------------------------------------------

  static boot () {
    super.boot();

    // Hacer hash a la contraseña del usuario antes de guardarla en la BD.
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  // VISBILIDAD de ATRIBUTOS
  // -------------------------------------------------------------------------------------------------------------------

  /**
   * Atributos que serán visibles en los arrays.
   *
   * @var array
   */
  static get visible () {
    return ['email', 'name', 'username', 'account_status', 'id'];
  }

  // RELACIONES
  // -------------------------------------------------------------------------------------------------------------------

  /**
   * 1 Usuario tiene N Tokens.
   * Se inserta relación belongsTo en Models/Tokens.
   *
   * @method tokens Plural.
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
