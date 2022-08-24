import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './main/chat/chat.component';
import { EmptyChatComponent } from './main/empty-chat/empty-chat.component';

const routes: Routes = [
  {
    path: '',
    component: EmptyChatComponent
  },
  {
    path: 'chat/:id',
    component: ChatComponent
  },
  {
    path: '*',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
