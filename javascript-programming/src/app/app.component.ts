import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorldComponent } from '../world/world.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorldComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'javascript-programming';
}
 