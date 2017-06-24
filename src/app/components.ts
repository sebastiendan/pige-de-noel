// Elements
import HeaderBlock from './components/elements/headerBlock/headerBlock';

// Pages
import HomePage from './components/pages/homePage/homePage';

import app from './app';

// Elements
app.component('headerBlock', new HeaderBlock());

// Pages
app.component('homePage', new HomePage());