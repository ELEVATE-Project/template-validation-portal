import { Directive, Input, TemplateRef, OnInit, ElementRef, HostListener, ViewContainerRef } from '@angular/core';
import { ComponentType, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { OverlayRef, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';


@Directive({
  selector: '[appCustomTooltip]'
})
export class CustomTooltipDirective implements OnInit {


  @Input('appCustomTooltip')
  tooltipContent!: TemplateRef<any> | ComponentType<any>;


  private _overlayRef: OverlayRef | undefined ;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    if (this.tooltipContent) {
      const position = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetX: 0,
          offsetY: 8,
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetX: 0,
          offsetY: -8,
        }
      ]);

      // create the overlay element
      this._overlayRef = this.overlay.create({
        // position
        positionStrategy: position,
        scrollStrategy: this.overlay.scrollStrategies.close(),
        // class name to add
        panelClass: 'custom-tooltip',
      });
    }
    // if error throws
    else {
      console.error('Content have issues');
    }
  }

  @HostListener('mouseenter')
  private _show(): void {
    // if overlay element exists
    if (this._overlayRef) {
      let containerPortal: TemplatePortal<any> | ComponentPortal<any>;

      // cretae template
      if (this.tooltipContent instanceof TemplateRef) {
        containerPortal = new TemplatePortal(this.tooltipContent, this.viewContainerRef);
      }
      else {
        containerPortal = new ComponentPortal(this.tooltipContent, this.viewContainerRef);
      }

      // all the element to overlay ref
      this._overlayRef.attach(containerPortal);
    }
  }

  @HostListener('mouseout')
  private _hide(): void {
    // to un overlay element
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

}
