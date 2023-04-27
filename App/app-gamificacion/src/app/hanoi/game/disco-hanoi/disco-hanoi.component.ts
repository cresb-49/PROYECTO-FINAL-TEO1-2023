import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-disco-hanoi',
  templateUrl: './disco-hanoi.component.html',
  styleUrls: ['./disco-hanoi.component.css']
})
export class DiscoHanoiComponent {
  @Input() peso = 0;
}
