// export interface FileUpload {
//   fileUp: File;
//   filename: string;
// }

import { SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File;
  filename: string;
  url: SafeUrl;
}
