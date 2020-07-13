import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoryReaderComponent } from './DirectoryReader/directory-reader.component';

const routes: Routes = [

  {
    path: '**', component: DirectoryReaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
