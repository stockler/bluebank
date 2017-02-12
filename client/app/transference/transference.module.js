import configTransference from './transference.config';
import TransferenceController from './transference.controller';

angular
  .module('transference.widget', ['api.bluebank', 'account.widget'])
  .config(configTransference)
  .controller('TransferenceController', TransferenceController);