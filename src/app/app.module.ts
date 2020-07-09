import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { FolderReaderPageComponent } from './folder-reader-page/folder-reader-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderListComponent,
    FilePreviewComponent,
    FolderReaderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
