import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective implements OnChanges{

  @Input()
  color ='yellow'

  constructor(private el: ElementRef<HTMLElement>) { 
    this.apllyStyles()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['color']){
      this.apllyStyles()
    }
    
  }

  apllyStyles():void{
    this.el.nativeElement.style.backgroundColor = this.color
  }

}
