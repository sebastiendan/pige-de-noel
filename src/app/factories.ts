import {MembersFactory} from './factories/MembersFactory';
import {PigeFactory} from './factories/PigeFactory';
import app from './app';

app.factory('MembersFactory', MembersFactory.getInstance);
app.factory('PigeFactory', PigeFactory.getInstance);