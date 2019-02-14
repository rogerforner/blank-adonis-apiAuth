'use strict'

const Model = use('Model')

class Token extends Model {
  // RELACIONES
  // -------------------------------------------------------------------------------------------------------------------
  /**
   * 1 Token pertenece a 1 Usuario.
   * Se inserta relación hasMany en Models/User.
   *
   * @method user Singular.
   * @return {Object}
   */
  user () {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Token;
