import { provideDownloadService } from '@/lib/download-service';
import { provideImageService } from '@/lib/image-service';
import { RuntimeAdapter } from '@/lib/adapters';

export default defineBackground(() => {
  provideDownloadService(new RuntimeAdapter());
  provideImageService(new RuntimeAdapter());
});
