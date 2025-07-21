import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; 

library.add(faChevronDown);

export default FontAwesomeIcon;

import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronDown, faChevronRight, faChevronLeft);
