import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FolderComponent } from './DirectoryReader/folder/folder.component';
import { FileComponent } from './DirectoryReader/file/file.component';

import { DirectoryReaderComponent } from './DirectoryReader/directory-reader.component';
import { FilePreviewerComponent } from './FilePreviewer/file-previewer.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectoryReaderComponent,
    FilePreviewerComponent,
    FolderComponent,
    FileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
