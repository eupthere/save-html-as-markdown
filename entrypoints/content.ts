import { providePageService } from '@/lib/page-service';
import { RuntimeAdapter } from '@/lib/adapters';

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    providePageService(new RuntimeAdapter());
  },
});
