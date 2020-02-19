import { Component } from '@angular/core';
import { VideoService } from '../core/video/video.service';
import { Video } from 'app/core/video/video.model';

@Component({
  selector: 'jhi-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent {
  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  video: Video;

  constructor(private videoService: VideoService) {}

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  change($event) {
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.videoService.pushFileToStorage(this.currentFileUpload).subscribe(event => {});
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
