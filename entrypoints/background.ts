import { provideDownloadService } from '@/lib/download-service';
import { RuntimeAdapter } from '@/lib/adapters';

export default defineBackground(() => {
  provideDownloadService(new RuntimeAdapter());
});
