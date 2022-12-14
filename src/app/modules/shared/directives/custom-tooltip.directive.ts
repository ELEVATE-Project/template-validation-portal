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
    // Si se recibe el contenido a mostrar
    if (this.tooltipContent) {
      // Se crea la configuración de posicionamiento para el tooltip
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

      // Se crea el overlay y se guarda su referencia
      this._overlayRef = this.overlay.create({
        // Configuración para la posición del overlay
        positionStrategy: position,
        // Comportamiento del overlay cuando se haga scroll y se esté mostrando
        scrollStrategy: this.overlay.scrollStrategies.close(),
        // Clase para darle estilo al overlay
        panelClass: 'custom-tooltip',
      });
    }
    // Se muestra un error si la directiva no recibe contenido para mostrar
    else {
      console.error('[ERROR] La directiva tiene que recibir el contenido a mostrar...');
    }
  }

  @HostListener('mouseenter')
  private _show(): void {
    // Si existe overlay se enlaza con el contenido
    if (this._overlayRef) {
      let containerPortal: TemplatePortal<any> | ComponentPortal<any>;

      // Creamos un TemplatePortal si lo que recibió la directiva era un Template
      if (this.tooltipContent instanceof TemplateRef) {
        containerPortal = new TemplatePortal(this.tooltipContent, this.viewContainerRef);
      }
      // En caso contrario creamos un ComponentPortal
      else {
        containerPortal = new ComponentPortal(this.tooltipContent, this.viewContainerRef);
      }

      // Enlazamos el portal con el overlay creado al iniciar la directiva
      this._overlayRef.attach(containerPortal);
    }
  }

  @HostListener('mouseout')
  private _hide(): void {
    // Si existe un overlay se desenlaza del contenido
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

}
