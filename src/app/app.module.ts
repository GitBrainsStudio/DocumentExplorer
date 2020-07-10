import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { FolderReaderPageComponent } from './folder-reader-page/folder-reader-page.component';

import { HttpClientModule } from '@angular/common/http';
import { FolderComponent } from './folder-list/folder/folder.component';
import { FileComponent } from './folder-list/file/file.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FolderListComponent,
    FilePreviewComponent,
    FolderReaderPageComponent,
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
