// Elements
import HeaderBlock from './components/elements/headerBlock/headerBlock';
import SpouseSelector from './components/elements/spouseSelector/spouseSelector';

// Pages
import HomePage from './components/pages/homePage/homePage';
import MemberPage from './components/pages/memberPage/memberPage';
import MembersPage from './components/pages/membersPage/membersPage';

import app from './app';

// Elements
app.component('headerBlock', new HeaderBlock());
app.component('spouseSelector', new SpouseSelector());

// Pages
app.component('homePage', new HomePage());
app.component('memberPage', new MemberPage());
app.component('membersPage', new MembersPage());