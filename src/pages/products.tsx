import { CONFIG } from 'src/config-global';

import EmailsView from 'src/sections/product/view/products-view';
 // <-- se for export default

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Products - ${CONFIG.appName}`}</title>
      <EmailsView />
    </>
  );
}
